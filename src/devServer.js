// lib
let http = require( 'http' );
let extend = require('util')._extend;
let Rounter = require( './rounter' );

// 正则()匹配可以做，还有一个疑问是怎么判断静态资源url（用标志位表示？）
// /single/request/resource -> http://target.host.com/single/request/resource
// /(\/api\/.*)/ -> http://target.host.com/[path]
// /^\/dist\/(.*)/ -> ./resource/[path]
/*

let config = {
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
}*/


class DevServer {
  constructor( config ) {
    this.config = extend( {}, config );
  }
  listen( port ) {
    let r = this.router = new Rounter( this.config.routes );
    this.proxyServer = http.createServer( function(req, res) {
      r.dispatch( req, res );
    } );
    this.proxyServer.listen( port );
  }
}

module.exports = DevServer;
