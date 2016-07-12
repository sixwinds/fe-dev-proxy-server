let DevServer = require( '../src/devServer' );

let config = {
  routes: [
    {
      url: /(\/.*)/,
      target: 'http://localhost:10000[path]'
    }, {
      url: /\/dist\/(.*)/,
      target: './resources/[path]',
      static: true
    }
  ]
}

let server = new DevServer( config );
server.listen( 80 );

// let Url = require('url');

// console.log(Url.parse('/dist/trade/css/themes/black/entrance.css?staticVersion=dev.version'))
