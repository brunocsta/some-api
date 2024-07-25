import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000
app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});
