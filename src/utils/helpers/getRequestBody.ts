import { IncomingMessage } from 'http';

export const getRequestBody = async (req: IncomingMessage) => {
  return new Promise((res) => {
    const data: Uint8Array[] = [];

    req.on('data', (chunk) => {
      data.push(chunk);
    });

    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(data).toString());
      res(body);
    });
  });
};
