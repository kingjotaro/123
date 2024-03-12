import supertest from 'supertest';
import app from '../index';
import Drawer from '../Schema';

it('Should return status 200 and drawer documents if data is found in the database', async () => {
    // Request execution
    const response = await supertest(app.callback())
      .get('/getall');

    // Results verification
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    // Add more assertions if needed to verify the structure of the response
  });

  it('Should return status 404 if no data is found in the database', async () => {
    // Mocking a scenario where no data is found in the database
    jest.spyOn(Drawer, 'find').mockResolvedValue([]);

    // Request execution
    const response = await supertest(app.callback())
      .get('/getall');

    // Results verification
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'No data found in the database');
  });

  it('Should handle internal server errors properly', async () => {
    // Mocking a scenario where an internal server error occurs
    jest.spyOn(Drawer, 'find').mockImplementation(() => {
      throw new Error('Internal server error');
    });

    // Request execution
    const response = await supertest(app.callback())
      .get('/getall');

    // Results verification
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal server error');
  });

