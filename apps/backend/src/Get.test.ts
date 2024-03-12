import supertest from 'supertest';
import app from './index';


  it('Should return status 201', async () => {
    const response = supertest(app.callback()).get('/getall');
    expect(response.status).toBe(201);
  });

