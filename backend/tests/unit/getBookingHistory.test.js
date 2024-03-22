
// File: getBookingHistory.test.js
// ------------------
// This file contains unit test for the get booking history

// Author: Heavendeep kaur
// Date: February 24, 2024

// Import the required modules and the function to be tested
const getBookingHistory = require('../../src/routes/api/getBookingHistory');
const db = require('../../src/database');
const logger = require('../../src/logger');

// mock the database module
jest.mock('../../src/database', () => ({
    query: jest.fn()
  }));
// Mock the logger module
jest.mock('../../src/logger', () => ({
    info: jest.fn(),
    error: jest.fn()
  }));
  
  describe('getBookingHistory', () => {
    // Mock request and response objects
    let req, res;
  
    beforeEach(() => {
      req = {
        params: {
          customerId: 'testCustomerId'
        }
      };
      res = {
        status: jest.fn(() => res),
        send: jest.fn(),
        json: jest.fn()
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should return 400 if customerId is not provided', async () => {
      req.params.customerId = undefined;
      await getBookingHistory(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Customer ID is required');
    });
  
    it('should return 500 if there is an error in the database query', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback('Database error', null);
      });
  
      await getBookingHistory(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Error fetching booking history');
      expect(logger.error).toHaveBeenCalledWith('Error fetching booking history: Database error');
    });
  
    it('should return 404 if no booking history found for the given customer ID', async () => {
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, []);
      });
  
      await getBookingHistory(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith('No booking history found for the given customer ID');
    });
  
    it('should return booking history if found', async () => {
      const bookingData = [{ BookingID: 1, CustomerID: 'testCustomerId', /* other properties */ }];
      db.query.mockImplementation((sql, params, callback) => {
        callback(null, bookingData);
      });
  
      await getBookingHistory(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  
    it('should handle internal server error', async () => {
      db.query.mockImplementation(() => {
        throw new Error('Test error');
      });
  
      await getBookingHistory(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('An error occurred while fetching booking history');
      expect(logger.error).toHaveBeenCalledWith('Error in getBookingHistory: Error: Test error');
    });
  });