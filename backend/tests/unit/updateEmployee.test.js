// File: updateEmployee.test.js
// author: heaven

const updateEmployee = require('../../src/routes/v1/updateEmployee'); // Adjust the path to the actual file location
const db = require('../../src/database');
const logger = require('../../src/logger');

// Mock the external dependencies
jest.mock('../../src/database');
jest.mock('../../src/logger');

describe('updateEmployee', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
        logger.error.mockClear();
    });

    test('returns 400 if no update fields are provided', async () => {
        const mockReq = { params: { id: '1' }, body: {} }; // Missing update fields
        updateEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockSend).toHaveBeenCalledWith('At least one of contact number or full name must be provided for update.');
    });

    test('successfully updates an employee', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 1 }); // Simulate successful update
        });

        const mockReq = { params: { id: '1' }, body: { contactNumber: '1234567890', fullName: 'John Doe' } };
        updateEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockSend).toHaveBeenCalledWith('Invigilator details updated successfully');
    });

    test('returns 404 if the employee is not found', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, { affectedRows: 0 }); // Simulate no rows updated
        });

        const mockReq = { params: { id: '1' }, body: { contactNumber: '1234567890' } };
        updateEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(404);
        expect(mockSend).toHaveBeenCalledWith('Invigilator not found');
    });

    test('handles database errors', async () => {
        db.query.mockImplementation((sql, params, callback) => {
            callback(new Error('Database error'), null);
        });

        const mockReq = { params: { id: '1' }, body: { fullName: 'Jane Doe' } };
        updateEmployee(mockReq, mockRes);

        expect(logger.error).toHaveBeenCalledWith('Error updating Invigilator details:', expect.any(Error));
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith('Error updating Invigilator details');
    });
});