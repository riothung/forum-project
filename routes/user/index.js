const router = require("express").Router();

router.get('/get-user', (req, res) => {
  try {
    return res.json({
      data: "user data",
      success: true
    }).status(200)
  } catch (error) {
    return res.json({
      message: "cannot get user data",
      success: false
    }).status(500)
  }
})

router.get('/get-profile', (req, res) => {
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
