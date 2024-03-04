// File: register.js
// ------------------
// This file contains the registration route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

const bcrypt = require('bcryptjs');
const db = require('../../database'); 
const logger = require('../../logger');

module.exports = async (req, res) => {
    logger.info(req.body)
    const { email, password, contactNumber, fullName } = req.body;
    if (!email || !password || !contactNumber || !fullName) {
        return res.status(400).send('Email, password, contact number, and full name are required');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        // Step 1: Insert the new user into the Users table with the email
        const insertUserSql = 'INSERT INTO Users (Email, Password, UserType) VALUES (?, ?, "Customer")';
        db.query(insertUserSql, [email, hashedPassword], (err, userResult) => {
            if (err) {
                logger.error('Error registering new user:' + err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).send('Email already in use');
                }
                return res.status(500).send('Error registering new user');
            }

            // Step 2: Insert the customer details into the Customers table
            const userId = userResult.insertId;
            const insertCustomerSql = 'INSERT INTO Customer (CustomerID, Email, ContactNumber, FullName) VALUES (?, ?, ?, ?)';
            db.query(insertCustomerSql, [userId, email, contactNumber, fullName], (err) => {
                if (err) {
                    logger.error('Error registering customer details:', err);
                    return res.status(500).send('Error registering customer details');
                } else {
                    res.status(201).send('User registered successfully');
                }
            });
        });
    } catch (err) {
        logger.error(err);
        res.status(500).send('Server error');
    }
};