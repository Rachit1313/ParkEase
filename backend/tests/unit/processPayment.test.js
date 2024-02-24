// process-payment.test.js

const express = require('express');
const supertest = require('supertest');
const db = require('../../src/database');
const router = require('../../src/routes/api/processPayment');

const app = express();
app.use(express.json());
app.use('/api', router);

afterAll(() => {
  db.end(); // Close the database connection after all tests have completed
});

describe('Process Payment API', () => {
  it('returns 400 for invalid card number', async () => {
    const invalidPaymentData = {
      customerId: 'customer123',
      bookingId: 'booking123',
      amount: 100,
      cardNumber: '123456789012345', // Invalid card number
      cvv: '123',
      expMonth: '12',
      expYear: '2023' // Future expiration date
    };

    const response = await supertest(app)
      .post('/api/process-payment')
      .send(invalidPaymentData);

    expect(response.status).toBe(400);
    expect(response.text).toContain('Invalid card number');
  });

  it('returns 400 for invalid CVV', async () => {
    const invalidPaymentData = {
      customerId: 'customer123',
      bookingId: 'booking123',
      amount: 100,
      cardNumber: '1234567890123456',
      cvv: '12', // Invalid CVV
      expMonth: '12',
      expYear: '2023'
    };

    const response = await supertest(app)
      .post('/api/process-payment')
      .send(invalidPaymentData);

    expect(response.status).toBe(400);
    expect(response.text).toContain('Invalid CVV');
  });

  it('returns 400 for expired expiration date', async () => {
    const expiredPaymentData = {
      customerId: 'customer123',
      bookingId: 'booking123',
      amount: 100,
      cardNumber: '1234567890123456',
      cvv: '123',
      expMonth: '01',
      expYear: '2020' // Expired expiration date
    };

    const response = await supertest(app)
      .post('/api/process-payment')
      .send(expiredPaymentData);

    expect(response.status).toBe(400);
    expect(response.text).toContain('Invalid expiration date');
  });

});
