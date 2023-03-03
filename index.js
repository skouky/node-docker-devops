const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
let RedisStore = require("connect-redis")(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  MONGO_DATABASE,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const { createClient } = require("redis");
let redisClient = createClient({
  socket: { host: REDIS_URL, port: REDIS_PORT },
  legacyMode: true,
});
redisClient.connect().catch(console.error);

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const tradeRouter = require("./routes/tradeRoutes");
const feRouter = require("./routes/feRoutes");
const loginFeRouter = require("./routes/loginFeRoutes");
const adminFeRouter = require("./routes/adminFeRoutes");
const tradeFeRouter = require("./routes/tradeFeRoutes");

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoURL)
  .then(() => console.log("successfully connected to DB"))
  .catch((e) => console.log("Error connecting to db:", e));

app.enable("trust proxy");
app.use(cors({}));
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 7200000,
    },
  })
);

app.use(express.json());

app.set("view engine", "ejs");
//app.set("views", "./frontend");

app.get("/api/v1", (req, res) => {
  console.log("Yeah, it ran!");
  res.send("<h2>Hi There!!!</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/trades", tradeRouter);
app.use("/fe/v1/login", loginFeRouter);
app.use("/fe/v1/admin", adminFeRouter);
app.use("/fe/v1/trade", tradeFeRouter);
app.use("/fe/v1", feRouter);

const port = process.env.PORT || 2999;

app.listen(port, () => console.log(`listening on port ${port}`));
