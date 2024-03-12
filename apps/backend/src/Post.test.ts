import supertest from 'supertest';
import app from './index';

it('Should return status 201', async () => {
  const data = {
    name: 'Test',
    nodes: [],
    edges: []
  };

  const response = await supertest(app.callback()).post('/post').send(data);
  expect(response.status).toBe(201);
});
