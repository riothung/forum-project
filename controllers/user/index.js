// controller user

const getUserById = async (req, res) => {
  try {
    const id = req.params.id
    return res.status(200).json({
      data: "user" + id,
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "cannot get user data",
      success: false
    })
  }
}


module.exports = {
  getUserById
}