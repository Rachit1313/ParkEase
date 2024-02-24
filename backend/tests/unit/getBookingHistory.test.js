// Import necessary modules and dependencies
const getBookingHistory = require('../../src/routes/api/getBookingHistory');
const db = require('../../src/database');
const logger = require('../../src/logger');

// Mock Express Request and Response objects
const mockReq = (params) => ({ params });
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('getBookingHistory', () => {
  // Before running the tests, seed the database with some data
  beforeAll(async () => {
    // Seed the database with test data
    // Ensure that the test data includes bookings for valid and invalid customer IDs
  });

  // After running the tests, clear the database and close connections
  afterAll(async () => {
    // Clear the test data from the database
    // Close any database connections
  });

  it('should return status 400 if customerId is missing', async () => {
    const req = mockReq({});
    const res = mockRes();

    await getBookingHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('Customer ID is required');
  });

  it('should return status 404 if no booking history found for the given customer ID', async () => {
    const req = mockReq({ customerId: 'nonexistentCustomerId' });
    const res = mockRes();

    await getBookingHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith('No booking history found for the given customer ID');
  });

  it('should return status 200 with booking history if customerId is valid', async () => {
    const req = mockReq({ customerId: 'validCustomerId' });
    const res = mockRes();

    await getBookingHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // Add assertions to verify the response content if needed
  });

  it('should return status 500 if an error occurs while fetching booking history', async () => {
    const req = mockReq({ customerId: 'validCustomerId' });
    const res = mockRes();

    // Simulate an error while fetching booking history
    // This could be due to database connection issues, etc.
    // Ensure that the function handles such errors gracefully and returns a 500 status code
    // You might want to manipulate the database connection or query to trigger an error condition

    await getBookingHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('An error occurred while fetching booking history');
  });
});
