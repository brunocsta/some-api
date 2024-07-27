import express from "express";
import {
  query,
  body,
  validationResult,
  matchedData,
  checkSchema,
} from "express-validator";
import { createUserValidationSchema } from "./utils/validationSchemas.mjs";

const app = express();

app.use(express.json());

const logginMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

app.use(logginMiddleware);

const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.sendStatus(400);
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000

const mockUsers = [
  { id: 1, username: "bruno", displayName: "Bruno" },
  { id: 2, username: "caetano", displayName: "Caetano" },
  { id: 3, username: "dandara", displayName: "Dandara" },
  { id: 4, username: "daniele", displayName: "Daniele" },
  { id: 5, username: "rodrigo", displayName: "Rodrigo" },
  { id: 6, username: "maria", displayName: "Maria" },
  { id: 7, username: "joão", displayName: "João" },
];

app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage(`Must be a string`)
    .notEmpty()
    .withMessage(`Must not be empty`)
    .isLength({ min: 3, max: 10 })
    .withMessage(`Must be at least 3-10 characters`),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;
    //se o filter e o value estiverem vazios
    if (!filter && !value) return res.send(mockUsers);
    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers);
  }
);

app.post("/api/users", checkSchema(createUserValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);

  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });

  const data = matchedData(req);
  console.log(data);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 123, product: "chicken breasts", price: "12.99" }]);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return res.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  mockUsers.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
