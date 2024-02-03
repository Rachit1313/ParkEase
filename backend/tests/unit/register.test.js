
// File: register.test.js
// ------------------
// This file contains the test for the registration

// Author: Heavendeep kaur
// Date: February 2, 2024

const bcrypt = require('bcryptjs');
const db = require('../../src/database')

afterAll(() => {
  db.end(); // Close the database connection after all tests have completed
});

describe('User Registration', () => {
  it('should hash the password correctly', async () => {
    // Simulate user input
    const password = 'password123';

    // Simulate bcrypt hashing
    const hashedPassword = await bcrypt.hash(password, 8);

    // Check if the hashed password is non-empty and different from the original password
    expect(hashedPassword).toBeTruthy();
    expect(hashedPassword).not.toEqual(password);
  });
});
