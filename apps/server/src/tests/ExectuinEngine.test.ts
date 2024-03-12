import supertest from 'supertest';
import app from '../index';
import Drawer from '../Schema';

it('Should return status 200 and result', async () => {
  // Example data to send in the request body
  const requestData = {
    name: 123 // Example numeric value
  };

  // Example parameter for the route
  const param = '123';

  // Simulates a POST request sending data in the request body
  const response = await supertest(app.callback())
    .post(`/execution/${param}`)
    .send(requestData);

  // Checks if the route returned status 200
  expect(response.status).toBe(200);

  // Checks if the response body contains the 'result' property
  expect(response.body).toHaveProperty('result');
});

  it('Should handle errors properly', async () => {
    // Test setup
    const requestData = {
      rafael: "50",
      dias: "10",
      teste: "5"
    };
    const param = ''; // Invalid parameter to provoke an error

    // Request execution
    const response = await supertest(app.callback())
      .post(`/execution/${param}`)
      .send(requestData);

    // Results verification
    expect(response.status).toBe(404);
  });
