// libs
let fs = require( 'fs' );
let mime = require( 'mime' );

// hanlder
let ResponseStatusHandler = require( './responseStatusHandler' );


let ResourceHandler = {
  handle( req, res, routeOption ) {
    let resourcePath = routeOption.target;
    fs.stat( resourcePath, ( err, stat )=>{
      if ( err ) {
          ResponseStatusHandler.notFound( req, res );
      } else if ( stat.isFile() ) {
          this.setResHeader( req, res, resourcePath, stat );
          this.stream( req, res, resourcePath);
      } else {
          ResponseStatusHandler.badRequest( req, res );
      }
    } );
  },
  setResHeader( req, res, filePath, stat ) {
    // Content-Length:
    // Content-Type:
    res.writeHead( 200, {
      "Content-Type": req.headers['Content-Type'] || mime.lookup(filePath) || 'application/octet-stream',
      "Content-Length": stat.size
    } );
  },
  stream( req, res, filePath ) {
    fs.createReadStream( filePath, {
      flags: 'r',
      mode: 0o666,
      autoClose: true
    } ).on( 'error', function( err ) {
      ResponseStatusHandler.serverError( req, res );
    } ).pipe( res );
  }
}

module.exports = ResourceHandler;
