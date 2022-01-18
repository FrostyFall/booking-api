const emailTransporter = require('../config/nodemailer');

function Email(to, subject) {
  this.to = to;
  this.subject = subject;
  this.from = `Booking API <${process.env.EMAIL_SENDER}>`;
}

Email.prototype.send = async function (text) {
  this.text = text;

  await emailTransporter.sendMail(this);
};

module.exports = Email;
