// libs
let http = require( 'http' );
let Url = require('url');
let extend = require('util')._extend;
// utils
let CommonUtils = require( '../utils/commonUtils' );


function reqErrorHandler( error ) {
  console.log( 'request error: ' );
  console.log( error )
}

let ForwordHandler = {
  handle( req, res, routeOption ) {
    // https not supported yet
    let proxyReq = http.request(
      CommonUtils.parseProxyReqOption( req, routeOption )
    );
    // Ensure we abort proxy if request is aborted
    req.on( 'aborted', function () {
      proxyReq.abort();
    } );

    // Handle errors on incoming request as well as it makes sense to
    req.on('error', reqErrorHandler);

    // Error Handler
    proxyReq.on('error', reqErrorHandler);
    // forward reponse
    proxyReq.on( 'response', function( proxyRes ) {
      // console.log( 'piping response: ' + proxyRes.statusCode );
      res.writeHead( proxyRes.statusCode, extend({}, proxyRes.headers) );
      proxyRes.pipe(res);
    } );
    // forward request
    req.pipe( proxyReq );
    console.log( 'proxying: ' + req.url );
  }
}

module.exports = ForwordHandler;
