// __tests__/server.test.js

const supertest = require('supertest');
const { app } = require('../server');

const mockRequest = supertest(app);

describe('Server endpoints', () => {
  // Test for 404 on a bad route
  it('should respond with 404 on a bad route', async () => {
    const response = await mockRequest.get('/route');
    expect(response.status).toBe(404);
  });

  // Test for 404 on a bad method
  it('should respond with 404 on a bad method', async () => {
    const response = await mockRequest.post('/person');
    expect(response.status).toBe(404);
  });

  // Test for 500 if no name in the query string
  it('should respond with 500 if no name in the query string', async () => {
    const response = await mockRequest.get('/person?name=');
    expect(response.status).toBe(500);
  });

  // Test for 200 if the name is in the query string
  it('should respond with 200 if the name is in the query string', async () => {
    const response = await mockRequest.get('/person?name=test');
    expect(response.status).toBe(200);
  });

  // Test if the output object is correct when a name is provided in the query string
  it('should respond with correct output object when a name is provided in the query string', async () => {
    const response = await mockRequest.get('/person?name=test');
    expect(response.body).toEqual({ name: 'test' });
  });
});
