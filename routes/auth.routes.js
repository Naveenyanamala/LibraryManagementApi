import express from 'express';
import { signup,login,logout,getUsers,updateProfile} from '../controllers/auth.controller.js';
import {authenticate,admin} from '../middleware/authenticateAndAuthorize.js';
import {refreshToken} from "../routes/refreshToken.js";

const  router = express.Router();

router.route('/').post(signup).get(authenticate,admin,getUsers);
router.post('/login',login);

router.route('/profile/:id').patch(authenticate,admin,updateProfile);

router.post('/refresh',refreshToken);
export default router;