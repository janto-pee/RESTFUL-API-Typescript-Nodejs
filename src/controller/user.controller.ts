import { Request, Response } from "express";
import { omit } from "lodash";
import { createUserInput } from "../schema/user.schema";
import { createUser, findAllUsers } from "../service/user.service";

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

export async function findAllUsersHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;

    if (!userId) {
      return res.status(403).send("authorized");
    }

    const users = await findAllUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
}
