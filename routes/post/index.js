const router = require("express").Router();

router.get('/get-post', (req, res) => {
  try {
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
})

router.post('/create-post', (req, res) => {
  try {
    return res.json({
      data: "user profile",
      success: true
    }).status(200)
  } catch (error) {
    return res.json({
      message: "cannot get user profile",
      success: false
    }).status(500)
  }
})

module.exports = {
  router
}
