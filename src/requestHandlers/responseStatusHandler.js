let ResponseStatusHandler = {
  notFound( req, res ) {
    this.response( res, 404, {"Content-Type": "text/html"}, '<div>Proxy(Resource) Not Found</div>' );
  },
  badRequest( req, res ) {
    this.response( res, 400, {"Content-Type": "text/html"}, '<div>Bad Request</div>' );
  },
  serverError( req, res ) {
    this.response( res, 500, {"Content-Type": "text/html"}, '<div>Internal Server Error</div>' );
  },
  response( res, statusCode, resHeader, resBody ) {
    res.writeHead( statusCode, resHeader );
    res.write( resBody );
    res.end();
  }
}

module.exports = ResponseStatusHandler;
