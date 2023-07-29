import { IncomingMessage, ServerResponse } from 'http';
import Service from '../services/Service';
import { parseUrlId } from '../utils/helpers/parseUrlId';
import { getRequestBody } from '../utils/helpers/getRequestBody';
import { UserData } from '../utils/types/interfaces';
import ServerError from '../utils/ServerError';
import { sendServerResponse } from '../utils/helpers/sendServerResponse';

class Controller {
  public getAllUsers(res: ServerResponse) {
    try {
      const users = Service.getAllUsers();
      sendServerResponse(res, 200, users);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public getUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      const user = Service.getUser(id);
      sendServerResponse(res, 200, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = (await getRequestBody(req)) as UserData;
      const user = Service.createUser(body);
      sendServerResponse(res, 201, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async updateUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      const body = (await getRequestBody(req)) as UserData;
      const user = Service.updateUser(id, body);
      sendServerResponse(res, 200, user);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public deleteUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      Service.deleteUser(id);
      sendServerResponse(res, 204);
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: ServerResponse, e: unknown) {
    if (e instanceof Error) {
      if (e instanceof ServerError) {
        sendServerResponse(res, e.status, { message: e.message });
      } else {
        sendServerResponse(res, 500, { message: 'The server encountered an unexpected condition that prevented it from fulfilling the request' });
      }
    }
  }
}
export default new Controller();
