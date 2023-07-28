import { createServer } from './server';
import supertest from 'supertest';

const server = createServer();
const request = supertest(server);

describe('Endpoints', () => {
  afterAll(() => {
    server.close();
  });

  it('GET /api/users should get all users (an empty array is expected)', async () => {
    const res = await request.get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.from(res.body).length).toBe(0);
  });

  it('GET /api/users should get all users (an empty array is expected)', async () => {
    const user = {
      username: 'Oleg',
      age: '34',
      hobbies: ['swimming'],
    };

    const res = await request.post('/api/users').send(user);
    expect(res.status).toBe(201);
    expect(res.body).toBe(user);
  });
});
