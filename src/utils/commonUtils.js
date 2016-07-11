// libs
let Url = require('url');
let extend = require('util')._extend;
// enums
const Types = require( '../enums/types' );

let toStringFun = {}.toString;
let classToType = {};
let classes = 'Boolean Number String Function Array Date RegExp Object Error Symbol'.split( ' ' );
classes.forEach( classname => {
  classToType[ '[object '+classname+']' ] = classname.toLocaleLowerCase();
} )

let CommonUtils = {
  type( v ) {
    if ( typeof v === Types.Object || typeof v === Types.Function ) {
      return classToType[ toStringFun.call( v ) ] || 'object';
    } else {
      return typeof v;
    }
  },
  isUrl( target ) {
    let urlObject = Url.parse( target );
    return urlObject.protocol || urlObject.slashes || urlObject.host || urlObject.port;
  },
  isUrlMatched( req, routeOption ) {
    let routeUrl = routeOption.url;
    if ( this.type(routeUrl) === Types.String ) {
      return routeUrl === req.url;
    } else if ( this.type(routeUrl) === Types.RegExp ) {
      return routeUrl.test( req.url );
    }
    return false;
  },
  parseTarget( req, routeOption ) { 
    let reqUrl = req.url;
    let routeUrlRegExp = routeOption.url;
    let matches = routeUrlRegExp.exec( reqUrl );
    if ( matches[1] ) {
      return routeOption.replace( '[path]', matches[1] );
    } else {
      routeOption.target;
    }
  },
  parseProxyReqOption( incomingMessage, routeOption ) {
    let target = routeOption.target;
    let urlObject = Url.parse( target );
    let targetPath = urlObject.path === '/**' ? incomingMessage.url : (urlObject.path + (urlObject.hash || ''))
    return {
      protocol: urlObject.protocol,
      host: urlObject.host,
      hostname: urlObject.hostname,
      port: urlObject.port || '80',
      // localAddress: ?,
      // socketPath: ?,
      method: incomingMessage.method,
      path: targetPath,
      auth: urlObject.auth,
      agent: false,
      headers: extend( {}, incomingMessage.headers )
    }
  }
}

module.exports = CommonUtils;