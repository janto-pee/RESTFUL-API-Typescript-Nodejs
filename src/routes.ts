import { Request, Response, Express } from "express";
import {
  createProductHandler,
  deleteProductHandler,
  findAllProductsHandler,
  findProductHandler,
  updateProductHandler,
} from "./controller/product.controller";
import {
  CreateSessionHandler,
  deleteSessionHandler,
  findSessionHandler,
} from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import requireUser from "./middleware/requireUser";
import validation from "./middleware/validation";
import {
  createProductSchema,
  deleteProductSchema,
  findProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
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

  app.get("/api/sessions", requireUser, findSessionHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get("/api/users", requireUser, findAllProductsHandler);

  // product
  app.post(
    "/api/products",
    [requireUser, validation(createProductSchema)],
    createProductHandler
  );

  app.get(
    "/api/products/:productId",
    validation(findProductSchema),
    findProductHandler
  );

  app.get("/api/products", requireUser, findAllProductsHandler);

  app.put(
    "/api/products/:productId",
    [requireUser, validation(updateProductSchema)],
    updateProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validation(deleteProductSchema)],
    deleteProductHandler
  );
}
export default routes;
