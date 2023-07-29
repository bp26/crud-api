import { createServer } from './server';
import supertest from 'supertest';

const server = createServer();
const request = supertest(server);

const user = {
  username: 'Oleg',
  age: '34',
  hobbies: ['swimming'],
};

const updatedUser = {
  username: 'Oleg',
  age: '35',
  hobbies: ['swimming', 'jogging'],
};

describe('Endpoints', () => {
  afterAll(() => {
    server.close();
  });

  it('GET /api/users should get all users (an empty array is expected)', async () => {
    const res = await request.get('/api/users').set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });

  it('POST /api/users should create a new user (a response containing newly created record is expected)', async () => {
    const res = await request.post('/api/users').send(user).set('Accept', 'application/json');
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('username', user.username);
    expect(res.body).toHaveProperty('age', user.age);
    expect(res.body).toHaveProperty('hobbies', user.hobbies);
  });

  it('GET api/user/{userId} should get user with provided userId (the created record is expected)', async () => {
    const { id } = (await request.post('/api/users').send(user).set('Accept', 'application/json')).body;
    const res = await request.get(`/api/users/${id}`).set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ ...user, id });
  });

  it('PUT api/user/{userId} should update the user (a response is expected containing an updated object with the same id)', async () => {
    const { id } = (await request.post('/api/users').send(user).set('Accept', 'application/json')).body;
    const res = await request.put(`/api/users/${id}`).send(updatedUser).set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ ...updatedUser, id });
  });

  it('DELETE api/users/{userId} should delete the user (GET api/users/{userId} request should contain no such user)', async () => {
    const { id } = (await request.post('/api/users').send(user).set('Accept', 'application/json')).body;
    await request.delete(`/api/users/${id}`);
    const res = await request.get(`/api/users/${id}`).set('Accept', 'application/json');
    expect(res.status).toBe(404);
  });
});
