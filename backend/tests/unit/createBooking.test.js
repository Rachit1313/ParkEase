// create-booking.test.js

const express = require('express');
const supertest = require('supertest');
const db = require('../../src/database');
const router = require('../../src/routes/api/createBooking');

const app = express();
app.use(express.json());
app.use('/api', router);

afterAll(() => {
  db.end(); // Close the database connection after all tests have completed
});

describe('Create Booking API', () => {
    it('returns 400 for missing required fields', async () => {
      const incompleteBookingData = {
        // Missing required fields
      };
  
      const response = await supertest(app)
        .post('/api/create-booking')
        .send(incompleteBookingData);
  
      expect(response.status).toBe(400);
      expect(response.text).toContain('All fields are required');
    });
  
    it('returns 404 for non-existing parking spot', async () => {
      const invalidSpotBookingData = {
        customerId: 'customer123',
        garageId: 'garage123',
        spotId: 'invalidSpotId', // Non-existing spot ID
        checkInTime: '2024-02-23 10:00:00',
        checkOutTime: '2024-02-23 12:00:00'
      };
  
      const response = await supertest(app)
        .post('/api/create-booking')
        .send(invalidSpotBookingData);
  
      expect(response.status).toBe(404);
      expect(response.text).toContain('Parking spot not found');
    });
  
    it('returns 500 if fare rate fetch fails', async () => {
      // Mocking database query to simulate fare rate fetch failure
      db.query = jest.fn((sql, values, callback) => {
        callback(new Error('Fare rate fetch error'), null);
      });
  
      const validBookingData = {
        customerId: 'customer123',
        garageId: 'garage123',
        spotId: 'validSpotId',
        checkInTime: '2024-02-23 10:00:00',
        checkOutTime: '2024-02-23 12:00:00'
      };
  
      const response = await supertest(app)
        .post('/api/create-booking')
        .send(validBookingData);
  
      expect(response.status).toBe(500);
      expect(response.text).toContain('Error fetching fare rate');
    });

    
  });