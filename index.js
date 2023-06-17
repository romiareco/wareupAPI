
/*
const express = require("express");
const cors = require("cors")

const app = express();
const path = require("path");
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
*/

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const userRouter = require("./src/routes/user.route");
const authRouter = require("./src/routes/auth.route");

const sequelize = require("./src/database").sequelize;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3001;

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", userRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Welcome to the begining of nothingness" });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
