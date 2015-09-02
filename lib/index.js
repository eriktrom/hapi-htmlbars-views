var Htmlbars = require('htmlbars');
var DOMHelper = require('../node_modules/htmlbars/dist/cjs/dom-helper');
var DefaultHooks = require('../node_modules/htmlbars/dist/cjs/htmlbars-runtime/hooks');
var SimpleDOM = require('simple-dom');
var Hoek = require('hoek');

var internals = {};

internals.toHTML = function toHTML (node) {

    var serializer = new SimpleDOM.HTMLSerializer(SimpleDOM.voidMap);

    if (Array.isArray(node)) {
        var nodes = node;
        var buffer = '';
        for (var i = 0; i < nodes.length; i++) {
            buffer += serializer.serialize(nodes[i]);
        }
        return buffer;
    }

    return serializer.serialize(node);

};

internals.hooks = Hoek.applyToDefaults({}, DefaultHooks);

internals.domHelper = function domHelper () {

    var doc = new SimpleDOM.Document();
    return new DOMHelper(doc);
};

internals.COMPILE_OPTS_DEFAULTS = { disableComponentGeneration: false }; // TODO

internals.RENDER_OPTS_DEFAULTS = {};

exports.compile = function compile (input, compileOpts) {

    compileOpts = Hoek.applyToDefaults(internals.COMPILE_OPTS_DEFAULTS, compileOpts);
    var template = Htmlbars.compile(input, compileOpts);

    return function runtime (data, renderOpts) {

        renderOpts = Hoek.applyToDefaults(internals.RENDER_OPTS_DEFAULTS, renderOpts);

        var env = {
            dom: internals.domHelper(),
            hooks: internals.hooks,
            helpers: {}
        };

        var output = template.render(data, env, {});

        return internals.toHTML(output.fragment);
    };
};
