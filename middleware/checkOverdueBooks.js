import express from 'express';
const router= express.Router();

function checkOverdueBooks(books) {
  

  router.use((req, res, next) => {
    const today = new Date();
    req.overdueBooks = books.filter((book) => book.dueDate < today);
    next();
  });

  return router;
}

module.exports = { checkOverdueBooks };
