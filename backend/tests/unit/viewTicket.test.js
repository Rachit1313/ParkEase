// viewTicket.test.js
// author: heaven

const viewTicketDetails = require('../../src/routes/ticket/viewTicket'); // Adjust the path to the actual file location
const db = require('../../src/database');

// Mock the external dependencies
jest.mock('../../src/database');

describe('viewTicketDetails', () => {
    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockRes = { status: mockStatus };

    beforeEach(() => {
        // Clear mock calls before each test
        mockJson.mockClear();
        mockStatus.mockClear();
        db.query.mockClear();
    });

    test('successfully retrieves ticket details', async () => {
        const mockResults = [{
            TicketID: '1',
            ResponseText: 'Test response',
            ResponseTime: '2024-03-19 12:00 PM'
        }];
        db.query.mockImplementation((sql, params, callback) => {
            callback(null, mockResults); // Simulate successful ticket retrieval
        });

        const mockReq = { params: { ticketID: '1' } };
        await viewTicketDetails(mockReq, mockRes);

        expect(db.query).toHaveBeenCalledWith(
            expect.any(String),
            ['1'],
            expect.any(Function)
        );
        expect(mockStatus).toHaveBeenCalledWith(200);
        expect(mockJson).toHaveBeenCalledWith(mockResults);
    });


});