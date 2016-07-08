// let DevServer = require( '../src/devServer' );

// let config = {
//   routes: [
//     {
//       url: /\/.*/,
//       target: 'http://localhost:10000/**'
//     }, {
//       url: /\/dist\/trade\/css\/themes\/black\/homepage\.css/,
//       target: './resources/trade/css/themes/black/homepage.css'
//     }, {
//       url: /\/dist\/trade\/js\/index\.js/,
//       target: './resources/trade/js/index.js'
//     }
//   ]
// }

// let server = new DevServer( config );
// server.listen( 80 );

var path = require('path');
var s = path.resolve(__dirname, 'node_modules');
let Url = require('url');
console.log( Url.parse( s ) )