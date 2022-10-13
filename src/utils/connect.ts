import config from "config";
import mongoose from "mongoose";
import log from "./logger";

export async function connect() {
  const dbURI = config.get<string>("dbURI");

  await mongoose.connect(dbURI);
  log.info("connected to database");
}
