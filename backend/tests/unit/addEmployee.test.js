// File: addEmployee.test.js

const addEmployee = require('../../src/routes/v1/addEmployee'); // Adjust the path to the actual file location
const bcrypt = require('bcryptjs');
const db = require('../../src/database');
const logger = require('../../src/logger');

// Mock the external dependencies
jest.mock('bcryptjs');
jest.mock('../../src/database');
jest.mock('../../src/logger');

describe('addEmployee', () => {
    const mockSend = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ send: mockSend });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockSend.mockClear();
        mockStatus.mockClear();
        bcrypt.hash.mockClear();
        db.query.mockClear();
        logger.info.mockClear();
        logger.error.mockClear();
    });

    test('returns 400 if required fields are missing', async () => {
        const mockReq = { body: {} }; // Missing required fields
        await addEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(400);
        expect(mockSend).toHaveBeenCalledWith('Email, password, contact number, and full name are required');
    });

    test('returns 409 if email is already in use', async () => {
        db.query.mockImplementationOnce((sql, params, callback) => {
            const error = new Error('Duplicate entry');
            error.code = 'ER_DUP_ENTRY';
            callback(error);
        });

        const mockReq = { body: { email: 'test@example.com', password: 'password', contactNumber: '1234567890', fullName: 'Test User' } };
        await addEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(409);
        expect(mockSend).toHaveBeenCalledWith('Email already in use');
    });

    test('successfully registers a new employee', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');
        db.query.mockImplementationOnce((sql, params, callback) => {
            callback(null, { insertId: 1 }); // Simulate successful user insertion
        }).mockImplementationOnce((sql, params, callback) => {
            callback(null); // Simulate successful Invigilator details insertion
        });

        const mockReq = { body: { email: 'test@example.com', password: 'password', contactNumber: '1234567890', fullName: 'Test User' } };
        await addEmployee(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockSend).toHaveBeenCalledWith('User registered successfully');
    });

    test('handles unexpected server errors', async () => {
        bcrypt.hash.mockRejectedValue(new Error('Server error'));

        const mockReq = { body: { email: 'test@example.com', password: 'password', contactNumber: '1234567890', fullName: 'Test User' } };
        await addEmployee(mockReq, mockRes);

        expect(logger.error).toHaveBeenCalled();
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockSend).toHaveBeenCalledWith('Server error');
    });
});