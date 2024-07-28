import express from "express";
import routes from "./routers/index.mjs";
const app = express();

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000

app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

