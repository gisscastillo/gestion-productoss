jest.mock('../src/models/User', () => ({
  findOne: jest.fn(),
  prototype: {
    save: jest.fn()
  }
}));

const request = require('supertest');
const app = require('../src/app');

describe('Auth endpoints', () => {
  const testUser = {
  email: `test${Date.now()}@test.com`,
  password: '123456'
};


  it('Debe registrar un usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBeDefined();
  });

  it('Debe hacer login y devolver token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});