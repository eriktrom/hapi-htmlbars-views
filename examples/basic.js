var Hapi = require('hapi');
var Vision = require('vision');
var Hoek = require('hoek');
var HapiHtmlbarsViews = require('..');


var internals = {};


internals.handler = function (request, reply) {

    reply.view('basic/index', {
        title: 'examples/basic.js | Hapi ' + request.server.version,
        message: 'Hello World!'
    });
};


var server = new Hapi.Server();
server.connection({ port: 8000 });
server.register(Vision, function (err) {

    Hoek.assert(!err, err);

    server.views({
        engines: { hbs: HapiHtmlbarsViews },
        relativeTo: __dirname,
        path: 'templates'
    });

    server.route({ method: 'GET', path: '/', handler: internals.handler });

    server.start(function (err) {

        Hoek.assert(!err, err);

        console.log('Server is listening at ' + server.info.uri);
    });
});
