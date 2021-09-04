import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import errorsController from "./app/errors/errors.controller.js";
import config from "./config/config.js";
import db from "./config/db.js";
import logger from "./config/logger.js";
import route from "./app/routes.js";
const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);

app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use("/api", route);
app.get("/", (req, res) => {
  res.jsonp({
    message: "^_^ Backend Job Seeking is Running ^_^",
  });
});
app.use((req, res, next) => {
  const error = new Error("404 Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  return errorsController.respondError(res, req, next)(error);
});
db.connect()
  .then(() => {
    app.listen(config.port, () => {
      logger.info(`Server is listening to port ${config.port}`);
    });
  })
  .catch((err) => {
    logger.error(err);
  });
