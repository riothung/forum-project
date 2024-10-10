// controller post

const prisma = require("../../db")

// get post data by id
const getPostById = async (req, res) => {
  try {
    const postId = parseInt(req.params.id)

    if (!postId) {
      return res.status(400).json({
        message: "Id is not specified",
        success: false
      })
    }

    const posts = await prisma.post.findUnique(
      {
        where: {
          id: postId
        }
      })
    if (!posts) {
      return res.status(404).json({
        message: "Post not found",
        success: false
      })
    }

    return res.status(200).json({
      data: posts,
      success: true
    })

  } catch (error) {
    return res.status(500).json({
      message: "Cannot get post",
      success: false
    })
  }
}

// get all post data by user
const getUserPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: 1 //change id with user id later
      },
      take: 10
    })
    return res.status(200).json({
      data: posts,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Cannot get posts data",
      success: false
    })
  }
}

// create post
//TODO: need to login
const createPost = async (req, res) => {
  //need to sanitize the input
  //maybe using zod later
  const { title } = req.body

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
      success: false
    })
  }

  try {

    const createdPost = await prisma.post.create({
      data: {
        title: title,
        userId: 1
      }
    })

    return res.status(200).json({
      data: createdPost,
      message: "Succesfully create post",
      success: true
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Cannot create post",
      success: false
    })

  }
}

// delete post
const deletePost = async (req, res) => {

  const postId = parseInt(req.params.id)

  if (!postId) {
    return res.status(400).json({
      message: "ID not specified",
      success: false
    })
  }

  try {

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
        userId: 1 //later change to user id
      }
    })

    return res.status(200).json({
      data: deletedPost,
      message: "Succesfully delete post",
      success: true
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Cannot delete post",
      success: false
    })

  }
}

// update/edit post
const updatePost = async (req, res) => {
  //TODO: need to sanitize the input
  //maybe using zod later
  const postId = parseInt(req.params.id)

  const { title } = req.body

  if (!postId) {
    return res.status(400).json({
      message: "ID not specified",
      success: false
    })
  }

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
      success: false
    })
  }

  try {

    const updatedPost = await prisma.post.update({
      data: {
        title: title,
      },
      where: {
        id: postId,
        userId: 1 //change to user id later
      }
    })

    return res.status(200).json({
      data: updatedPost,
      message: "Succesfully update post",
      success: true
    })

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      message: "Cannot update post",
      success: false
    })

  }

}


module.exports = {
  getPostById,
  createPost,
  getUserPosts,
  deletePost,
  updatePost
}