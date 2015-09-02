var Code = require('code');
var Lab = require('lab');
var Hapi = require('hapi');
var Stringify = require('json-stringify-safe');
var Subject = require('..');


var internals = {};


internals.debug = function debug () {

    var args = Array.prototype.slice.call(arguments);
    var msg = args.shift();

    console.log(msg, Stringify(args[0], null , 4));
    console.log('--------------\n\n\n\n--------');
};


var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var beforeEach = lab.beforeEach;
var expect = Code.expect;
var it = lab.test;

describe('Engine', function () {

    it('should be an object with a compile method', function (done) {

        expect(Subject).to.be.an.object();
        expect(Subject.compile).to.be.a.function();
        done();
    });
});

describe('Basic non view engine test', function () {

    it('should render', function (done) {

        var input = '<p>Server says {{message}}</p>';
        var data = { message: 'w00t, it renders' };

        var actual = Subject.compile(input)(data);

        internals.debug('output is', actual);

        expect(actual).to.equal('<p>Server says w00t, it renders</p>');

        done();
    });
});
