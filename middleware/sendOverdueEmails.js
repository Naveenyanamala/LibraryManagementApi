import expres from 'express';
import nodemailer from 'nodemailer';

const router= expres.Router();

// Configure nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password',
  },
});

router.use((req, res, next) => {
  const { overdueBooks } = req;

  overdueBooks.forEach((book) => {
    const mailOptions = {
      from: 'your_email@gmail.com',
      to: 'recipient_email@example.com',
      subject: `Overdue Book: ${book.title}`,
      text: `The book '${book.title}' is overdue. Please return it as soon as possible.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  });

  next();
});

module.exports = { sendOverdueEmails };
