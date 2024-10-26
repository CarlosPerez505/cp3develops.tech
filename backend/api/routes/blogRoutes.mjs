import express from 'express';
import {createBlog, deleteBlog, getBlogById, getBlogs, updateBlog} from '../controllers/blogController.mjs';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
