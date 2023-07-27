import * as http from 'http';
import Router from './routers/Router';

http
  .createServer((req, res) => {
    if (req.method && req.url) {
      Router.match(req, res);
    }
  })
  .listen(3000);
