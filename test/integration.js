var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Cheerio = require('cheerio');
var Vision = require('vision');
var Hoek = require('hoek');
var Subject = require('..');

var internals = {};

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var beforeEach = lab.beforeEach;
var expect = Code.expect;
var it = lab.test;


describe('Integration with vision', function () {

    var server;

    beforeEach(function (done) {

        server = new Hapi.Server(0);
        server.register(Vision, function (err) {

            Hoek.assert(!err, err);

            server.views({
                engines: { hbs: Subject },
                relativeTo: __dirname,
                path: 'fixtures'
            });
        });

        done();
    });

    it('successfully renders', function (done) {

        var context = {
            title: 'w00t, it renders'
        };

        server.render('basic-example', context, function (err, output) {

            expect(err).to.not.exist();
            done();
        });
    });

    it('successfully renders the content', function (done) {

        var context = {
            title: 'w00t, it renders'
        };

        server.render('basic-example', context, function (err, output) {

            expect(output).to.contain('Server says w00t, it renders');
            done();
        });
    });
});

describe('e2e', function () {

    it('successfully renders the content within the larger context of the page', function (done) {

        var server = new Hapi.Server();
        server.connection({ port: 0 });
        server.register(Vision, function (err) {

            expect(err).to.not.exist();

            server.views({
                engines: { hbs: Subject },
                relativeTo: __dirname,
                path: 'fixtures'
            });

            server.route({
                method: 'GET',
                path: '/',
                handler: function (request, reply) {

                    reply.view('basic-example', {
                        title: 'w00t, it renders',
                        message: 'oh hai message!'
                    });
                }
            });

            server.start(function (err) {

                expect(err).to.not.exist();

                console.log('Server is listening at ' + server.info.uri);
            });
        });

        server.inject({ method: 'GET', url: '/' }, function (res) {

            expect(res.statusCode, 'Status code').to.equal(200);
            expect(res.headers['content-type'], 'content-type').to.equal('text/html');

            console.log('res.result is %o', res.result);

            var $ = Cheerio.load(res.result);
            var expectedHTML = $('body').html(); // TODO: fix failure here: Object.keys called on non-object
            var expectedMessage = $('h1').text();

            expect(expectedHTML).to.contain('<h1>Server says oh hai message!</h1>');
            expect(expectedMessage).to.equal('Server says oh hai message!');

            server.stop(done);
        });

    });
});
