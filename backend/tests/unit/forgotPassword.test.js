
// File: login.test.js
// ------------------
// This file contains unit test for the login 

// Author: Heavendeep kaur
// Date: February 3, 2024

// Import the necessary modules
const forgotPassword = require('../../src/routes/api/forgotPassword');
const db = require('../../src/database');

afterAll(() => {
  db.end(); // Close the database connection after all tests have completed
});

// Import dotenv and configure it
require('dotenv').config();


// Define a test user email
const testUserEmail = 'test@example.com';

// Mock request and response objects
const req = { body: { email: testUserEmail } };
let res;

// Unit test
describe('forgotPassword route', () => {
  beforeEach(() => {
    // Reset response object before each test
    res = {
      status: jest.fn(() => res),
      send: jest.fn()
    };
  });

  it('should return 400 if email is not provided', async () => {
    const reqWithoutEmail = { body: {} };
    await forgotPassword(reqWithoutEmail, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Email is required');
  });

  it('should return 500 if an error occurs during database query', async () => {
    const originalQueryFn = db.query;
    db.query = jest.fn((sql, values, callback) => {
      callback(new Error('Database error'), null);
    });

    await forgotPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Error updating password');

    // Restore original function after the test
    db.query = originalQueryFn;
  });

  it('should return 404 if no user found with the provided email', async () => {
    const originalQueryFn = db.query;
    db.query = jest.fn((sql, values, callback) => {
      callback(null, { affectedRows: 0 });
    });

    await forgotPassword(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('No user found with the provided email');

    // Restore original function after the test
    db.query = originalQueryFn;
  });

  
});
