// libs
let extend = require('util')._extend;
// enums
const Types = require( './enums/types' );
// utils
let CommonUtils = require( './utils/commonUtils' );
// handler
let ForwardHandler = require( './requestHandlers/forwardHandler' );
let ResourceHandler = require( './requestHandlers/resourceHandler' );
let ResponseStatusHandler = require( './requestHandlers/responseStatusHandler' );
/*
routes: [{
        url: '/positions',
        target: 'http://localhost:1000/positions'
    }, {
        url: /\/api/
    }, {
        url: '/index',
        target: './resource/index.html'
    }, {
        url: '/static/js/index.js',
        target: './dist/js/index.js'
    }, {
        url: '/orders',
        target: function(req, res) {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write('<h1>Node.js</h1>');
            res.end('<p>HelloWorld</p>');
        }
    }]

interface routeOption {
  url: string,
  target: string,
  static: boolean
}
*/
class Rounter {
  constructor( routes ) {
    this.routes = routes || [];
  }

  dispatch( req, res ) {
    let reqUrl = req.url;
    let routesArray = this.routes;
    let len  = routesArray.length;
    let matched = false;

    for ( let i = len-1; i >= 0; i-- ) {
      let routeOption = routesArray[ i ];
      let routeUrl = routeOption.url;

      matched = CommonUtils.isUrlMatched( req, routeOption );
      if ( matched ) {
        this.handleRequest( req, res, routeOption );
        break;
      }
    }
    if ( !matched ) ResponseStatusHandler.notFound( req, res );
  }

  handleRequest( req, res, routeOption ) {
    let target = routeOption.target;

    // parse target
    let currRouteOptioin = extend( {}, routeOption );
    if ( CommonUtils.type(routeOption.url) === Types.RegExp ) {
      extend( currRouteOptioin, {
        target: CommonUtils.parseTarget( req.url, routeOption.url, routeOption.target, routeOption.static )
      } );
    }
    // handler dispactch
    if ( !currRouteOptioin.static ) {
      ForwardHandler.handle( req, res, currRouteOptioin );
    } else {
      ResourceHandler.handle( req, res, currRouteOptioin );
    }
  }
}

module.exports = Rounter;