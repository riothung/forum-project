const router = require("express").Router();
const auth = require("../../controllers/auth/authController.js");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/googleLogin", auth.loginWithGoogle);

module.exports = {
  router,
};
