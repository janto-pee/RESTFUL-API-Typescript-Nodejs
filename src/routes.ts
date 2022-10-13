import { Request, Response, Express } from "express";
import {
  createProductHandler,
  findProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  CreateSessionHandler,
  findSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validation from "./middleware/validation";
import createSessionSchema from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";

function routes(app: Express) {
  app.get("/test", (req: Request, res: Response) => {
    res.status(200).send(`you're on the test page`);
  });

  app.post("/api/users", validation(createUserSchema), createUserHandler);

  // sessions
  app.post(
    "/api/sessions",
    validation(createSessionSchema),
    CreateSessionHandler
  );

  app.get("/api/sessions", findSessionHandler);

  // product
  app.post("/api/products", createProductHandler);
  app.get("/api/products/:productId", findProductHandler);
  app.put("/api/products/:productId", updateProductHandler);
  app.delete("/api/products/:productId", createProductHandler);
}
export default routes;
