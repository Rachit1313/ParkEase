// File: respondToTicket.test.js
// ------------------
// This file contains the test for the registration

// Author: Heavendeep kaur
// Date: march 31, 2024



const addTicketResponse = require('../../src/routes/ticket/respondToTicket'); // Adjust the path to the actual file location
const db = require('../../src/database');
const logger = require('../../src/logger');


// Mock the external dependencies
jest.mock('../../src/database');
jest.mock('../../src/logger');
jest.mock('moment-timezone', () => {
  // Mock the moment().tz() chain
  const momentMock = { format: jest.fn() };
  momentMock.format.mockReturnValue('2024-03-19 12:00:00'); // Mocked formatted time
  return jest.fn(() => ({
    tz: jest.fn(() => momentMock)
  }));
});

describe('addTicketResponse', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
        logger.info.mockClear();
    });

    test('successfully adds a ticket response', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: 1 }); // Simulate successful response addition
        });

        const mockReq = { body: { ticketID: '1', responderID: '2', responseText: 'Test response' } };
        await addTicketResponse(mockReq, mockRes);

        expect(logger.info).toHaveBeenCalledWith('2024-03-19 12:00:00'); // Check if logger.info was called with the mocked time
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Response added successfully', responseID: 1 });
    });

    test('handles database errors', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null); // Simulate a database error
        });

        const mockReq = { body: { ticketID: '1', responderID: '2', responseText: 'Test response' } };
        await addTicketResponse(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Error responding to ticket' });
    });
});