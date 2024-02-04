// File: forgotPassword.js
// ------------------
// This file contains the forgot password route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('../../database'); 
const logger = require('../../logger');

module.exports = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send('Email is required');
  }

  try {
    // Generate a new random password
    const newPassword = crypto.randomBytes(10).toString('hex');

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 8);

    // Update the user's password in the database
    const sql = 'UPDATE Users SET Password = ? WHERE Email = ?';
    db.query(sql, [hashedPassword, email], (err, result) => {
      if (err) {
        logger.error('Error updating password:', err);
        return res.status(500).send('Error updating password');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('No user found with the provided email');
      }

      // Set up nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      // Set up email options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your new password',
        text: `Your new password is: ${newPassword}`
      };

      // Send the email
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          logger.error('Error sending email:', err);
          return res.status(500).send('Error sending email');
        }
        res.status(200).send('New password sent to your email');
      });
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};