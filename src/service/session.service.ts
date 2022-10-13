import { get, Omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import SessionModel, {
  SessionInput,
  SessionDocument,
} from "../model/session.model";
import { verifyJwt } from "../utils/jwt.utils";

export async function createSession(
  input: DocumentDefinition<Omit<SessionInput, "valid">>
) {
  const session = await SessionModel.create(input);
  return session;
}

export async function findSession(query: FilterQuery<SessionDocument>) {
  const session = await SessionModel.find(query).lean();
  return session;
}
