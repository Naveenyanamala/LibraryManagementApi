import express from 'express';
const router = express.Router();
import upload from '../middleware/upload.js';
import {authenticate ,admin} from '../middleware/authenticateAndAuthorize.js';
import {
    createBook ,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook
} from  '../controllers/book.controller.js'

router.route('/').get(getAllBooks);
router.route('/:books').get(getBook);

router.route('/adminbook').post(authenticate,admin,upload.array("files[]"),createBook);

router.route('/:id').
        patch(authenticate,admin,updateBook)
        .delete(authenticate,admin,deleteBook);






export default router;