import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validation =
  (Schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      Schema.parse({ body: req.body, params: req.params, query: req.query });
    } catch (error) {
      return res.status(400).send(error);
    }
    next();
  };
export default validation;
