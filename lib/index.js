var Htmlbars = require('htmlbars');
var DOMHelper = require('../node_modules/htmlbars/dist/cjs/dom-helper');
var DefaultHooks = require('../node_modules/htmlbars/dist/cjs/htmlbars-runtime/hooks');
var SimpleDOM = require('simple-dom');
var Hoek = require('hoek');

var internals = {};

internals.hooks = Hoek.applyToDefaults({}, DefaultHooks);
internals.createDOM = function createDOM () {

    return new DOMHelper(new SimpleDOM.Document());
};
internals.COMPILE_OPTS_DEFAULTS = { disableComponentGeneration: false };
internals.RENDER_OPTS_DEFAULTS = {};

internals.compile = function (input, compileOpts) {

    compileOpts = Hoek.applyToDefaults(internals.COMPILE_OPTS_DEFAULTS, compileOpts);
    var template = Htmlbars.compile(input, compileOpts);

    return function runtime (data, renderOpts) {

        renderOpts = Hoek.applyToDefaults(internals.RENDER_OPTS_DEFAULTS, renderOpts);

        var env = {
            dom: internals.createDOM(),
            hooks: internals.hooks,
            helpers: {}
        };

        var output = template.render(data, env, { contextualElement: 'BODY' });

        console.log('output is', output);
        console.log("documentElement is %o", env.dom.document.documentElement);

        return output;
    };
};

module.exports = {
    compile: internals.compile
};
