import express from "express";

const app = express();
const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000
const mockUsers = [
  { id: 1, username: "bruno", displayName: "Bruno" },
  { id: 2, username: "caetano", displayName: "Caetano" },
  { id: 3, username: "dandara", displayName: "Dandara" },
];

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/users", (req, res) => {
  res.send(mockUsers);
});

app.get("/api/users/:id", (req, res) => {
  console.log(req.params);
  const parsedID = parseInt(req.params.id);
  if (isNaN(parsedID)) return res.sendStatus(400);

  const findUsers = mockUsers.find((user) => user.id === parsedID);
  if (!findUsers) return res.sendStatus(404);
  return res.send(findUsers);
});

app.get("/api/products", (req, res) => {
  res.send([
    { id: 123, product: "chicken breasts", price: "12.99" },
    { id: 456, product: "soya beans", price: "7.99" },
    { id: 789, product: "energy drink", price: "3.59" },
  ]);
});

app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});
