const express = require('express');
const postController = require('../controllers/postController');
const { protect, editorOrAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, editorOrAdmin, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', protect, editorOrAdmin, postController.updatePost);
router.delete('/:id', protect, editorOrAdmin, postController.deletePost);

module.exports = router;
