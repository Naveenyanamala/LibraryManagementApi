import express from 'express'
import {checkOut,bookReturn} from '../controllers/borrow.controller.js';
const router = express.Router();

router.post('/',checkOut);
router.get('/:book',bookReturn);



export default router;