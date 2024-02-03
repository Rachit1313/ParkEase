// File: login.test.js
// ------------------
// This file contains unit test for the login 

// Author: Heavendeep kaur
// Date: February 2, 2024

const request = require('supertest');
const app = require('../../src/app'); // Assuming your Express app is exported from this file
const db = require('../../src/database')

afterAll(() => {
  db.end(); // Close the database connection after all tests have completed
});

describe('loginHandler', () => {
  it('should return 400 if email or password are missing', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({});

    expect(res.status).toBe(400);
    expect(res.text).toBe('Email and password are required');
  });

  it('should return 401 if no user found with the provided email', async () => {
    // Simulate a scenario where no user is found in the database with the provided email
    // You may need to set up your database accordingly for this test
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'nonexistent@example.com', password: 'password123' });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Incorrect email or password');
  });

  it('should return 401 if password is incorrect', async () => {
    // Simulate a scenario where the provided password is incorrect
    // You may need to set up your database accordingly for this test
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(res.status).toBe(401);
    expect(res.text).toBe('Incorrect email or password');
  });

  it('should return a token if login is successful', async () => {
    // Simulate a scenario where login is successful
    // You may need to set up your database accordingly for this test
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'user@example.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.userType).toBe('Customer'); // Check userType
  });

});
