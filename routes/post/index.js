const { getPostById, createPost, getUserPosts, deletePost, updatePost } = require("../../controllers/post");

const router = require("express").Router();

// routes post
router.get('/get-user-posts', getUserPosts)
router.get('/:id', getPostById)

//TODO: implement the protected route later
router.post('/create', createPost)
router.delete('/delete/:id', deletePost)
router.put('/update/:id', updatePost)

module.exports = {
  router
}
