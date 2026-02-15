jest.mock('../src/models/User', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true)
  }));
});

const User = require('../src/models/User');

User.findOne = jest.fn();

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');

describe('Auth endpoints', () => {
  const testUser = {
    email: `test${Date.now()}@test.com`,
    password: '123456'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debe registrar un usuario', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBeDefined();
  });

  it('Debe hacer login y devolver token', async () => {
    const hashed = await bcrypt.hash(testUser.password, 10);

    User.findOne.mockResolvedValue({
      id: '123',
      password: hashed
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
