const express = require("express");
const app = express();

app.get("/", (_, res) => {
  res.send("catman-blogger-rest");
});

const port = 5000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
