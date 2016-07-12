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
  isUrlMatched( req, routeOption ) {
    let routeUrl = routeOption.url;
    if ( this.type(routeUrl) === Types.String ) {
      return routeUrl === req.url;
    } else if ( this.type(routeUrl) === Types.RegExp ) {
      return routeUrl.test( req.url );
    }
    return false;
  },
  parseTarget( reqUrl, routeUrlRegExp, targetPatten, isStatic ) {
    let questionMarkIndex = reqUrl.indexOf( '?' );
    reqUrl = (isStatic && questionMarkIndex>=0) ? reqUrl.substring( 0, questionMarkIndex ) : reqUrl;
    let matches = routeUrlRegExp.exec( reqUrl );

    if ( matches[1] ) {
      return targetPatten.replace( '[path]', matches[1] );
    } else {
      return targetPatten;
    }
  },
  parseProxyReqOption( incomingMessage, routeOption ) {
    let urlObject = Url.parse( routeOption.target );
    // let targetPath = urlObject.path === '/**' ? incomingMessage.url : (urlObject.path + (urlObject.hash || ''))
    return {
      protocol: urlObject.protocol,
      host: urlObject.host,
      hostname: urlObject.hostname,
      port: urlObject.port || '80',
      // localAddress: ?,
      // socketPath: ?,
      method: incomingMessage.method,
      path: urlObject.path,
      auth: urlObject.auth,
      agent: false,
      headers: extend( {}, incomingMessage.headers )
    }
  }
}

module.exports = CommonUtils;