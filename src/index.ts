import express from "express";
import config from "config";
import { connect } from "./utils/connect";
import routes from "./routes";
import log from "./utils/logger";
import deserializeUser from "./middleware/deserialzeUser";

const app = express();
app.use(express.json());
app.use(deserializeUser);

const port = config.get<number>("port");

app.listen(port, () => {
  connect();
  routes(app);
  log.info(`listening on port ${port}`);
});
