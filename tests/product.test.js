process.env.JWT_SECRET = 'testsecret';
jest.mock('../src/models/Product', () => {
  const ProductMock = function (data) {
    return {
      ...data,
      save: jest.fn().mockResolvedValue({
        ...data,
        _id: 'mockedid'
      }),
      deleteOne: jest.fn().mockResolvedValue(true)
    };
  };

  ProductMock.find = jest.fn().mockResolvedValue([]);
  ProductMock.findById = jest.fn();
  ProductMock.findByIdAndUpdate = jest.fn();

  return ProductMock;
});

const User = require('../src/models/User');
User.findOne = jest.fn();

jest.mock('../src/models/Product', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue(true),
    deleteOne: jest.fn().mockResolvedValue(true)
  }));
});

const Product = require('../src/models/Product');
Product.find = jest.fn().mockResolvedValue([]);
Product.findById = jest.fn();
Product.findByIdAndUpdate = jest.fn();

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');

describe('Product endpoints', () => {
  let token;

  const testUser = {
    email: `product${Date.now()}@test.com`,
    password: '123456'
  };

  beforeAll(async () => {

    const hashed = await bcrypt.hash(testUser.password, 10);

    User.findOne.mockResolvedValue({
      id: '123',
      password: hashed
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    token = res.body.token;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debe negar acceso sin token', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(401);
  });

  it('Debe crear un producto', async () => {
  const res = await request(app)
    .post('/api/products')
    .set('Authorization', `Bearer ${token}`)
    .send({ name: 'Producto de prueba', price: 9.99 });

  expect(res.statusCode).toBe(200);

  expect(res.body).toBeDefined();
});

  it('Debe obtener los productos del usuario', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
