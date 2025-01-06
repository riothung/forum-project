const router = require("express").Router();

const userRouter = require("./user");
const postRouter = require("./post");
const authRouter = require("./auth/index.js")

router.get("/", (req, res) => {
  return res.json("Hello");
});

router.use("/user", userRouter.router);
router.use("/post", postRouter.router);

router.use("/auth", authRouter.router);

module.exports = router;
