const { getPostById, createPost } = require("../../controllers/post");

const router = require("express").Router();

// routes post

router.get('/:id', getPostById)
router.post('/create', createPost)

module.exports = {
  router
}
