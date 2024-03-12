import supertest from 'supertest';
import app from '../index';
import Drawer from '../Schema';

it('Should return status 200 and drawer document if name is provided', async () => {
    // Test setup
    const name = 'exampleName';

    // Request execution
    const response = await supertest(app.callback())
      .get(`/get?name=${name}`);

    // Results verification
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', name);
    // Add more assertions if needed to verify the structure of the response
  });

  it('Should return status 400 if name parameter is missing', async () => {
    // Request execution
    const response = await supertest(app.callback())
      .get('/get');

    // Results verification
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Name parameter is missing in the query string');
  });

  it('Should return status 404 if drawer document is not found for the provided name', async () => {
    // Test setup
    const name = 'nonexistentName';

    // Request execution
    const response = await supertest(app.callback())
      .get(`/get?name=${name}`);

    // Results verification
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Drawer not found for the provided name');
  });

  it('Should handle internal server errors properly', async () => {
    // Mocking a scenario where an internal server error occurs
    jest.spyOn(Drawer, 'findOne').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    // Request execution
    const response = await supertest(app.callback())
      .get('/get');

    // Results verification
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', "Name parameter is missing in the query string");
  });
