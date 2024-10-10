const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
const helmet = require("helmet")
const compression = require("compression")
const cookieParser = require("cookie-parser")

const router = require("./routes/index");

const app = express();

const PORT = 3000


dotenv.config()
app.use(helmet())
app.use(compression())
app.use(cookieParser())

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log("Server listening in port " + PORT);
});
