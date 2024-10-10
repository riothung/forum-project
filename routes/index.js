const router = require("express").Router();

const userRouter = require("./user");
const postRouter = require("./post");

router.get("/", (req, res) => {
  return res.json("Hello")
})

router.use("/user", userRouter.router);
router.use("/post", postRouter.router);


module.exports = router;
