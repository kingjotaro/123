import supertest from 'supertest';
import app from './index';

it('Should return status 200', async () => {
  const response = await supertest(app.callback()).get('/getall');
  expect(response.status).toBe(200);
});
