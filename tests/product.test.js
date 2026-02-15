// Generate Jest tests for product routes using supertest
const request = require('supertest');
const app = require('../src/app'); 
// Generate Jest tests for protected product routes using supertest
describe('Product endpoints', () => {
  let token;
    const testUser = {
    email: 'productjest@test.com',
    password: '123456'
  };

  beforeAll(async () => {
    // Registrar usuario (por si no existe)
    await request(app)
      .post('/api/auth/register')
      .send(testUser);

    // Login para obtener token
    const res = await request(app)
      .post('/api/auth/login')
      .send(testUser);

    token = res.body.token;
  });

  it('Debe negar acceso sin token', async () => {
    const res = await request(app)
      .get('/api/products');

    expect(res.statusCode).toBe(401);
  });

  it('Debe crear un producto', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Producto de prueba', price: 9.99 });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Producto de prueba');
    expect(res.body.price).toBe(9.99);
  });

  it('Debe obtener los productos del usuario', async () => {
    const res = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});