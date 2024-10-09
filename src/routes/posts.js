const express = require('express');
const router = express.Router();

const validation = require('../middleware/validate');
const postsController = require('../controllers/posts');

router.get('/', postsController.getAllPosts);

router.get('/:id', validation.validateHexkey, postsController.getPostById);

router.post('/', validation.validatePost, postsController.createPost);

router.put('/:id', validation.validatePost, postsController.updatePost);

router.delete('/:id', validation.validateHexkey, postsController.deletePost);

module.exports = router;