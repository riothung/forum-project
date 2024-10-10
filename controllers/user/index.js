// controller user

const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    return res.json({
      data: "user" + id,
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
  getUserById
}