// File: createTicket.test.js
// ------------------
// This file contains unit test for creating ticket

// Author: Heavendeep kaur
// Date: march 31, 2024


const createTicket = require('../../src/routes/ticket/createTicket'); // Adjust the path to the actual file location
const db = require('../../src/database');


// Mock the external dependencies
jest.mock('../../src/database');
jest.mock('moment-timezone', () => {
  // Mock the moment().tz() chain
  const momentMock = { format: jest.fn() };
  momentMock.format.mockReturnValue('2024-03-19 12:00:00'); // Mocked formatted time
  return jest.fn(() => ({
    tz: jest.fn(() => momentMock)
  }));
});

describe('createTicket', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
    });

    test('successfully creates a ticket', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { insertId: 1 }); // Simulate successful ticket creation
        });

        const mockReq = { body: { customerID: '1', subject: 'Test Subject', description: 'Test Description', priority: 'High' } };
        await createTicket(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Ticket created successfully', ticketID: 1 });
    });

    test('handles database errors', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        const mockReq = { body: { customerID: '1', subject: 'Test Subject', description: 'Test Description' } }; // Priority defaults to 'Medium'
        await createTicket(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Error creating ticket' });
    });
});