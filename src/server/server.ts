import http from 'http';
import Router from '../routers/Router';

export const createServer = () =>
  http
    .createServer((req, res) => {
      if (req.method && req.url) {
        Router.match(req, res);
      }
    })
    .listen(process.env.PORT);
