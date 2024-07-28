import express from "express";
import routes from "./routers/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "bruno dev",
    saveUninitialized: false, //nao salva dados nao modificados no sessions store
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(routes);

const PORT = process.env.PORT || 3000; //caso não tenha um port do enviroment será setado 3000

app.listen(PORT, () => {
  console.log(`Runing on port ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(req.session);
  console.log(req.session.id);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 10000, signed: true });
  res.status(201).send({ msg: "Hello" });
});

