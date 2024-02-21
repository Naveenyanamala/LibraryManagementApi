import express from 'express';
const router = express.Router();
import protectRoute from '../middleware/protectRoute.js';
import {createBook} from  '../controllers/book.controller.js'
router.post('/',protectRoute,createBook);

export default router;