import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  try {
    return jwt.sign(object, privateKey, {
      ...(options && options),
      // algorithm: "RS256",
    });
  } catch (error) {
    return error;
  }
}
export function verifyJwt(token: string) {
  console.log("deeeeemain");
  try {
    const decoded = jwt.verify(token, publicKey);
    console.log("deeeeecodeeeedd", decoded);
    return { valid: true, decoded: decoded, expired: false };
  } catch (error: any) {
    return {
      valid: false,
      decoded: null,
      expired: error.message == error.message,
    };
  }
}
