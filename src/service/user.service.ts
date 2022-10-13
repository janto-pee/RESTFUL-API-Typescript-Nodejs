import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import UserModel, { UserInput } from "../model/user.model";

export async function createUser(input: UserInput) {
  const user = await UserModel.create(input);
  return user;
}

export async function validateUser(
  input: DocumentDefinition<Omit<UserInput, "name">>
) {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
}
