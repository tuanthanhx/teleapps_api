const request = require('supertest');
const { app } = require('../server');
const db = require('../src/models');

require('dotenv').config();

const api = `/api-common/${process.env.VERSION}`;

describe('Register by Email', () => {
  beforeAll(async () => {
    await db.user.destroy({
      where: {
        email: 'test-email-001@gmail.com',
      },
    });
  });

  it('POST /register/email - Success', async () => {
    const body = {
      email: 'test-email-001@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
      otp: '000000',
    };
    const response = await request(app).post(`${api}/register/email`).send(body);
    expect(response.statusCode).toBe(200);
  });
  it('POST /register/email - Invalid Email', async () => {
    const body = {
      email: 'test-email-001',
      password: '123456',
      passwordConfirm: '123456',
      otp: '000000',
    };
    const response = await request(app).post(`${api}/register/email`).send(body);
    expect(response.statusCode).toBe(400);
  });
  it('POST /register/email - Duplicate Email', async () => {
    const body = {
      email: 'test-email-001@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
      otp: '000000',
    };
    const response = await request(app).post(`${api}/register/email`).send(body);
    expect(response.statusCode).toBe(409);
  });
  it('POST /register/email - Invalid OTP', async () => {
    const body = {
      email: 'test-email-001@gmail.com',
      password: '123456',
      passwordConfirm: '123456',
      otp: '000001',
    };
    const response = await request(app).post(`${api}/register/email`).send(body);
    expect(response.statusCode).toBe(400);
  });
});
