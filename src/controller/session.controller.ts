import { Request, Response } from "express";
import { validateUser } from "../service/user.service";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import config from "config";
import {
  createSession,
  findSession,
  updateSession,
} from "../service/session.service";

export async function CreateSessionHandler(req: Request, res: Response) {
  // validate user
  const user = await validateUser(req.body);

  // return if no user
  if (!user) {
    return res.status(400).send("email or password not found");
  }

  const userAgent = req.get("userAgent") || "";
  const session = await createSession({ user: user._id, userAgent: userAgent });

  // access token
  const accessTokenTtl = config.get<string>("accessTokenTtl");
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: accessTokenTtl }
  );

  // refresh token
  const refreshTokenTtl = config.get<string>("refreshTokenTtl");
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: refreshTokenTtl }
  );

  // send access and refresh Token
  res.send({ session, accessToken, refreshToken });
}

// get session
export async function findSessionHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    console.log("res-locals: ", res.locals);
    const session = await findSession({ user: userId, valid: true });
    res.status(200).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;
    const sessionId = res.locals.user.session;
    await updateSession({ _id: sessionId }, { user: userId, valid: false });
  } catch (error) {
    res.status(400).send(error);
  }
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
