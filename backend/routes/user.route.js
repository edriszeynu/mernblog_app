import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { deleteUser, signout, updateUser } from '../controllers/user.controllers.js';

const router=express.Router()

router.put('/update/:userId',verifyToken,updateUser)
router.put('/updaate/:userId',verifyToken,deleteUser)
router.post('/signout',signout)


export default router;