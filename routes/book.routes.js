import express from 'express';
const router = express.Router();
import upload from '../middleware/upload.js';
import authenticateAndAuthorize from '../middleware/authenticateAndAuthorize.js';
import {
    createBook ,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
} from  '../controllers/book.controller.js'



router.get('/',getAllBooks);
router.post('/',authenticateAndAuthorize,upload.single("file"),createBook);
router.patch('/:id',authenticateAndAuthorize,updateBook)
router.delete('/:id',authenticateAndAuthorize,deleteBook);
router.get('/:books', getBook);




export default router;