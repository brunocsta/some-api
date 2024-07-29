import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./utils/constants.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
//session middleware antes do passport
app.use(
  session({
    secret: "bruno dev",
    saveUninitialized: false, //não salva dados nao modificados no sessions store
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000

app.post("/api/auth", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/auth/status", (req, res) => {
  console.log("Inside /auth/status endpoint");
  console.log(req.user);
  console.log(req.session);
  return req.user ? res.send(req.user) : res.sendStatus(401);
});

app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visted = true;
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(201).send({ msg: "Hello" });
});

app.post("/api/auth", (req, res) => {
  const {
    body: { username, password },
  } = req;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password)
    return res.status(401).send({ msg: "BAD CREDENTIALS" });
  req.session.user = findUser;
  return res.status(200).send(findUser);
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not Authenticated" });
});

app.get("/api/auth/logout", (req, res) => {
  if (!req.user) return res.sendStatus(401);
  req.logout((err) => {
    if (err) return res.sendStatus(400);
    res.sendStatus(200);
  });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  const { body: item } = req;

  const { cart } = req.session;
  if (cart) {
    cart.push(item);
  } else {
    req.session.cart = [item];
  }
  return res.status(201).send(item);
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) return res.sendStatus(401);
  return res.send(req.session.cart ?? []);
});