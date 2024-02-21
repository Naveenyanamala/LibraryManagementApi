import express from 'express';
const router = express.Router();
import authenticateAndAuthorize from '../middleware/authenticateAndAuthorize.js';
import {
    createBook ,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
} from  '../controllers/book.controller.js'


router.get('/',getAllBooks);
router.post('/',authenticateAndAuthorize,createBook);
router.patch('/:id',authenticateAndAuthorize,updateBook)
router.delete('/:id',authenticateAndAuthorize,deleteBook);
router.get('/:books', getBook);




export default router;