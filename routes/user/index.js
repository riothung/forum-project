const { getUserById } = require("../../controllers/user");

const router = require("express").Router();

router.get('/:id', getUserById)

module.exports = {
  router
}
