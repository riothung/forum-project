// controller post

const getPostById = async (req, res) => {
  try {
    console.log(req.params.id)
    return res.json({
      data: "user post",
      success: true
    }).status(200)
  } catch (error) {
    return res.json({
      message: "cannot get user data",
      success: false
    }).status(500)
  }
}

const createPost = async (req, res) => {
  try {
    console.log(req.params.id)
    return res.json({
      data: "user post",
      success: true
    }).status(200)
  } catch (error) {
    return res.json({
      message: "cannot get user data",
      success: false
    }).status(500)
  }
}

module.exports = {
  getPostById,
  createPost
}