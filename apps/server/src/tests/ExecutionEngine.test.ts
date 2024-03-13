import supertest from 'supertest';
import app from '../index';
import Drawer from '../Schema';

it('Should return status 200 and result', async () => {
  
  const requestData = {
    name: 123 
  };

  
  const param = '123';

  
  const response = await supertest(app.callback())
    .post(`/execution/${param}`)
    .send(requestData);

  
  expect(response.status).toBe(200);

 
  expect(response.body).toHaveProperty('result');
});

  it('Should handle errors properly', async () => {
   
    const requestData = {
      rafael: "50",
      dias: "10",
      teste: "5"
    };
    const param = ''; 

  
    const response = await supertest(app.callback())
      .post(`/execution/${param}`)
      .send(requestData);

    
    expect(response.status).toBe(404);
  });
