let WebSockectHandler = {
  handle( req, socket, head, routeOption ) {
    if ( this.isWsRequest(req, socket) ) {
      // create a ws proxy request
      // get proxy socket
      // steaming the data
    } else {
      socket.destroy();
    }
  },
  isWsRequest( req, socket ) {
    return req.method === 'GET' && req.headers.upgrade && req.headers.upgrade.toLowerCase() === 'websocket';
  }
}

module.exports = WebSockectHandler;
