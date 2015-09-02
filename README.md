# hapi-htmlbars-views

A hapi view engine for [HTMLBars](https://github.com/tildeio/htmlbars)

## Usage

Configuring the server (without [Glue](https://github.com/hapijs/glue))

```js
var Hapi = require('hapi');
var Vision = require('vision');
var Hoek = require('hoek');

var internals = {};

internals.myHandler = function (request, reply) {

    reply.view('basic/index', {
        message: 'Hello World!'
    });
};


var server = new Hapi.Server();
server.connection({ port: 8000 });
server.register(Vision, function (err) {

    Hoek.assert(!err, err);

    server.views({
        engines: { hbs: require('hapi-htmlbars-views') },
        path: '../templates',
        relativeTo: __dirname
    });

    server.route({ method: 'GET', path: '/', handler: internals.myHandler });

    server.start(function (err) {

        Hoek.assert(!err, err);

        console.log('Server is listening at ' + server.info.uri);
    });
});
```

Configuration can also be done via [Glue](https://github.com/hapijs/glue) and [Visionary](https://github.com/hapijs/visionary)

```js
var composer = module.exports = {};

composer.manifest = {
  connections: [
    {
      port: 8000
    }
  ],
  plugins: {
    'vision': {},
    'visionary': {
      'engines': { 'hbs': require('hapi-htmlbars-views') },
      'path': '../templates'
    }
  }
};

composer.composeOptions = {
  relativeTo: __dirname
};
```

See the [basic example](https://github.com/eriktrom/hapi-htmlbars-views/blob/master/examples/basic.js) for a working example.

## Notice

This plugin is not yet released on npm and will likely become centered around server side rendering with Ember and Hapi, at which point the name may change. Just FYI. :)

## Contribute

But of course! Get in touch. Drop an issue here on github or ping me on ember slack directly.

To get started:

    $ npm install
    $ npm test

To output test coverage to an html file:

    $ npm run test-cov-html

To give the demo a whirl:

    $ cd examples && node basic.js

## License

MIT
