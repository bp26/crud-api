import * as http from 'http';
import cluster from 'node:cluster';
import os from 'os';
import Router from './routers/Router';
import 'dotenv/config';
import { ApiMode } from './utils/types/enums';

const mode = process.argv.slice(2).includes('-multi') ? ApiMode.MULTI_INSTANCE : ApiMode.SINGLE_INSTANCE;
process.env.mode = mode;

const createServer = () => {
  http
    .createServer((req, res) => {
      if (req.method && req.url) {
        Router.match(req, res);
      }
    })
    .listen(process.env.PORT);
};

switch (mode) {
  case ApiMode.SINGLE_INSTANCE:
    createServer();
    break;

  case ApiMode.MULTI_INSTANCE:
    if (cluster.isPrimary) {
      cluster.schedulingPolicy = cluster.SCHED_RR;
      const cpuCount = os.cpus().length;

      for (let i = 0; i < cpuCount; i++) {
        cluster.fork();
      }

      cluster.on('exit', () => {
        cluster.fork();
      });
    }

    if (cluster.isWorker) {
      createServer();
    }

    break;
}
