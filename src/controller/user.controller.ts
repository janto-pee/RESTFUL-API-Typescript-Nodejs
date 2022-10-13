import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const body = req.body;
    const user = await createUser({ ...body });
    res.status(200).send(omit(user.toJSON(), "password"));
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
