const express = require("express");
const cors = require("cors")
const usersRouter = require('./routes/users');

const app = express();
const port = 3001;
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

app.use("/users", usersRouter);

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});