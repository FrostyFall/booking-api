const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((err) => {
  if (err) {
    console.log('Failed to connect to email service. Shutting down...');

    process.exit(1);
  } else {
    console.log('Connection to email service is up and running.');
  }
});

module.exports = transporter;
