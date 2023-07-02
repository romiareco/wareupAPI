const cors = require("cors")
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");


const companyRouter = require("./src/routes/company.route");
const userRouter = require("./src/routes/user.route");
const addressRouter = require("./src/routes/address.route");
const authRouter = require("./src/routes/auth.route");
const depositRouter = require("./src/routes/deposit.route");

const {API_VERSION} = require("./constants");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors())

const PORT = process.env.PORT || 3001;

app.use(`/api/${API_VERSION}`, authRouter);
app.use(`/api/${API_VERSION}`, userRouter);
app.use(`/api/${API_VERSION}`, addressRouter);
app.use(`/api/${API_VERSION}`, companyRouter);
app.use(`/api/${API_VERSION}`, depositRouter);

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
