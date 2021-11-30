const app = require('../src/app');
const mongoose = require('mongoose');
const request = require('supertest');

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/session ', () => {
  test('API should return a successful status code', async () => {
    const response = await request(app).get('/api/session');
    expect(response.statusCode).toBe(200);
  });
});

describe('GET /api/user/all ', () => {
  test('API should return a successful status code', async () => {
    const response = await request(app).get('/api/user/all');
    expect(response.statusCode).toBe(200);
  });
});
