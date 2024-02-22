// Create a separate file (e.g., overdueNotificationMiddleware.js)
import borrowModel from '../models/BorrowRecord.model.js';
import schedule from  'node-schedule';
import nodemailer from 'nodemailer';
// You may need to install nodemailer


const overdueNotificationMiddleware = () => {
  // Schedule the middleware to run every day at a specific time (adjust as needed)
  const job = schedule.scheduleJob('0 10 * * *', async () => {
    try {
      const currentDate = new Date();
      
      // Find all overdue books
      const overdueBooks = await borrowModel.find({
        'bookCheckOut.dueDate': { $lt: currentDate },
        'bookCheckOut.returned': false,
      });

      // Send notifications for overdue books
      overdueBooks.forEach(async (borrow) => {
        const { username, email, bookCheckOut } = borrow;

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'your-email@gmail.com',
            pass: 'your-email-password',
          },
        });

        // Customize the email content
        const mailOptions = {
          from: 'your-email@example.com',
          to: email,
          subject: 'Overdue Book Notification',
          text: `Dear ${username},\n\nYou have overdue books:\n\n${bookCheckOut.map(book => `${book.bookTitle} - Due on ${book.dueDate}`).join('\n')}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // You can also add additional logic here, such as marking the notification as sent
      });
    } catch (error) {
      console.error('Error in overdueNotificationMiddleware:', error);
    }
  });
};

module.exports = overdueNotificationMiddleware;
