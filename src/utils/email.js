const pug = require('pug');
const { convert } = require('html-to-text');
const emailTransporter = require('../config/nodemailer');

function Email(to, subject) {
  this.to = to;
  this.subject = subject;
  this.from = `Booking API <${process.env.EMAIL_SENDER}>`;
}

Email.prototype.send = async function (template, options) {
  const html = pug.renderFile(
    `${__dirname}/../views/emails/${template}.pug`,
    options
  );

  this.html = html;
  this.text = convert(html, { wordwrap: 80 });

  await emailTransporter.sendMail(this);
};

module.exports = Email;
