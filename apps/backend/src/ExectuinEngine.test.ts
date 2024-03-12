import supertest from 'supertest';
import app from './index';

it('Should return status 200 and result', async () => {
  const requestData = {
    rafael: "50",
    dias: "10",
    teste: "5"
  };

  const param = '123';

  const response = await supertest(app.callback())
    .post(`/execution/${param}`)
    .send(requestData);

  expect(response.status).toBe(200);

  expect(response.body).toHaveProperty('result');
});
