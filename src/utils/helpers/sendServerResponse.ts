import { ServerResponse } from 'http';

export const sendServerResponse = (res: ServerResponse, statusCode: number, data?: object) => {
  res.writeHead(statusCode, {
    'Content-type': 'application/json',
  });

  if (data) {
    res.write(JSON.stringify(data));
  }

  res.end();
};
