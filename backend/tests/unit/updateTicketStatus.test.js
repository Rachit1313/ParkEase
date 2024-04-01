// File: updateTicketStatus.test.js

// test file to test update ticket status
// author: heaven


const updateTicketStatus = require('../../src/routes/ticket/updateTicketStatus'); // Adjust the path to the actual file location
const db = require('../../src/database');

// Mock the external dependencies
jest.mock('../../src/database');

describe('updateTicketStatus', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
    });

    test('successfully updates ticket status', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null); // Simulate successful status update
        });

        const mockReq = { body: { ticketID: '1', status: 'Closed' } };
        await updateTicketStatus(mockReq, mockRes);

        expect(db.query).toHaveBeenCalledWith(
            `UPDATE Tickets SET Status = ? WHERE TicketID = ?`,
            ['Closed', '1'],
            expect.any(Function) // The callback function
        );
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Ticket status updated successfully' });
    });

    test('handles database errors', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error')); // Simulate a database error
        });

        const mockReq = { body: { ticketID: '1', status: 'Open' } };
        await updateTicketStatus(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith({ message: 'Error updating ticket status' });
    });
});