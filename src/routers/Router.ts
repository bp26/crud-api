import { ApiMode, HTTPMethods } from '../utils/types/enums';
import Controller from '../controllers/Controller';

import { IncomingMessage, ServerResponse } from 'http';
import { sendServerResponse } from '../utils/helpers/sendServerResponse';

class Router {
  public match(req: IncomingMessage, res: ServerResponse) {
    const endpoint = process.env.mode === ApiMode.MULTI_INSTANCE ? 'api' : 'api/users';

    if (new RegExp(`^/${endpoint}/?$`).test(req.url!)) {
      switch (req.method) {
        case HTTPMethods.GET:
          Controller.getAllUsers(res);
          break;
        case HTTPMethods.POST:
          Controller.createUser(req, res);
          break;
      }
    } else if (new RegExp(`^/${endpoint}/[^/]+/?$`).test(req.url!)) {
      switch (req.method) {
        case HTTPMethods.GET:
          Controller.getUser(req, res);
          break;
        case HTTPMethods.PUT:
          Controller.updateUser(req, res);
          break;
        case HTTPMethods.DELETE:
          Controller.deleteUser(req, res);
          break;
      }
    } else {
      sendServerResponse(res, 404, { message: `Endpoint '${req.url}' doesn't exist` });
    }
  }
}

export default new Router();
