import supertest from 'supertest';
import app from '../index';
import Drawer from '../Schema';

describe('Post Router', () => {
  it('Should return status 201 and created document if all required fields are provided', async () => {
    // Test setup
    const requestBody = {
      name: 'exampleName',
      nodes: [{ id: 1, value: 'node1' }],
      edges: [{ source: 1, target: 2 }]
    };

    // Request execution
    const response = await supertest(app.callback())
      .post('/post')
      .send(requestBody);

    // Results verification
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', requestBody.name);
    // Add more assertions if needed to verify the structure of the response
  });

  it('Should return status 400 if any required field is missing in the request body', async () => {
    // Test setup
    const invalidRequestBody = {
      name: 'exampleName',
      // Missing 'nodes' and 'edges'
    };

    // Request execution
    const response = await supertest(app.callback())
      .post('/post')
      .send(invalidRequestBody);

    // Results verification
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required fields in the request body');
  });

})