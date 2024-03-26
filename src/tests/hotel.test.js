const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async() => {
  const res = await request(app).post('/users/login').send({
      email: 'test@gmail.com',
      password: 'test1234',
  });
  token = res.body.token;
});

test('GET /hotels', async () => {
  const res = await request(app).get('/hotels');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test('POST /hotels', async () => {
  const body = {
      name: 'Hilton',
      description: 'El mejor hotel',
      price: '1500',
      address: 'New York',
      cityId: 3,
      lat: '20242024',
      lon: '20242024',
  }
  const res = await request(app).post('/hotels')
      .send(body)
      .set('Authorization', `Bearer ${token}`);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(body.name);
});

test('DELETE /hotels/:id', async () => {
  const res = await request(app)
      .delete('/hotels/'+id)
      .set('Authorization', `Bearer ${token}`);
  expect(res.status).toBe(204);
});

