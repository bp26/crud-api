import { IncomingMessage, ServerResponse } from 'http';
import Service from '../services/Service';
import { parseUrlId } from '../utils/helpers/parseUrlId';
import { getRequestBody } from '../utils/helpers/getRequestBody';
import { UserData } from '../utils/types/interfaces';
import ServerError from '../utils/ServerError';

class Controller {
  public getAllUsers(res: ServerResponse) {
    try {
      const users = Service.getAllUsers();
      res.writeHead(200);
      res.write(JSON.stringify(users));
      res.end();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public getUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      const user = Service.getUser(id);
      res.writeHead(200);
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async createUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const body = (await getRequestBody(req)) as UserData;
      const user = Service.createUser(body);
      res.writeHead(201);
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public async updateUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      const body = (await getRequestBody(req)) as UserData;
      const user = Service.updateUser(id, body);
      res.writeHead(200);
      res.write(JSON.stringify(user));
      res.end();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  public deleteUser(req: IncomingMessage, res: ServerResponse) {
    try {
      const id = parseUrlId(req.url!);
      Service.deleteUser(id);
      res.writeHead(204);
      res.end();
    } catch (error) {
      this.handleError(res, error);
    }
  }

  private handleError(res: ServerResponse, e: unknown) {
    if (e instanceof Error) {
      if (e instanceof ServerError) {
        res.writeHead(e.status);
      } else {
        res.writeHead(500);
      }
      res.write(JSON.stringify({ message: 'The server encountered an unexpected condition that prevented it from fulfilling the request' }));
      res.end();
    }
  }
}
export default new Controller();
