const fetchTickets = require('../../src/routes/ticket/listTickets'); // Adjust the path to the actual file location
const db = require('../../src/database');

// Mock the external dependencies
jest.mock('../../src/database');

describe('fetchTickets', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockJson.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
    });

    test('successfully fetches tickets with no query parameters', async () => {
        const mockResults = [{ ticketID: 1, CustomerID: '1', Status: 'Open', Priority: 'High' }];
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, mockResults); // Simulate successful ticket fetching
        });

        const mockReq = { query: {} };
        await fetchTickets(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockResults);
    });

    test('successfully fetches tickets with multiple query parameters', async () => {
        const mockResults = [{ ticketID: 2, CustomerID: '2', Status: 'Closed', Priority: 'Medium' }];
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, mockResults); // Simulate successful ticket fetching
        });

        const mockReq = { query: { customerID: '2', status: 'Closed', priority: 'Medium' } };
        await fetchTickets(mockReq, mockRes);

        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockResults);
    });


});
