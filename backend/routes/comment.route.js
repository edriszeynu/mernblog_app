import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createComment, deleteComment, editComment, getcomments, getPostComments, likeComment } from '../controllers/comment.controllers.js';

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getComments/:postId', getPostComments); // make sure frontend uses /getComments
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

router.get('/getcomments',verifyToken,getcomments)

export default router;
