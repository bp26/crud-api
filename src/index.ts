import * as http from 'http';
import Router from './routers/Router';
import 'dotenv/config';

http
  .createServer((req, res) => {
    if (req.method && req.url) {
      Router.match(req, res);
    }
  })
  .listen(process.env.PORT);
