# fe-dev-proxy-server
Frontend development proxy server

## Usage

http://localhost/api/v1/user -> http://api.server.com/api/v1/user
``` javascript
let DevServer = require( 'fe-dev-proxy-server' );

let config = {
  routes: [
    {
      url: '/api/v1/user',
      target: 'http://api.server.com/api/v1/user'
    }
  ]
}

let server = new DevServer( config );
server.listen( 80 );
```

http://localhost/api/** -> http://api.server.com/api/{all api url}
``` javascript
let DevServer = require( 'fe-dev-proxy-server' );

let config = {
  routes: [
    {
      url: /\/api\/(.*)/,
      target: 'http://api.server.com/api/[path]'
    }
    // or 
    // {
    //   url: /\/(api\/.*)/,
    //   target: 'http://api.server.com/[path]'
    // }
  ]
}

let server = new DevServer( config );
server.listen( 80 );
```

http://localhost/static/js/index.js -> D:\tmp\resources\js\index.js
``` javascript
let DevServer = require( 'fe-dev-proxy-server' );

let config = {
  routes: [
    {
      url: '/static/js/index.js',
      target: 'D:\tmp\resources\js\index.js',
      static: true
    }
  ]
}

let server = new DevServer( config );
server.listen( 80 );
```

http://localhost/static/** -> './resources/{all static resource}'
``` javascript
let DevServer = require( 'fe-dev-proxy-server' );

let config = {
  routes: [
    {
      url: /\/static\/(.*)/,
      target: './resources/[path]', // relative path to current folder running this proxy server
      static: true
    }
  ]
}

let server = new DevServer( config );
server.listen( 80 );
```