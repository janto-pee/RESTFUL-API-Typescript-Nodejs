import { object, string, TypeOf } from "zod";

const createSessionSchema = object({
  body: object({
    email: string({ required_error: "Field is required" }).email(
      "not a valid email"
    ),
    password: string({ required_error: "Field is required" }).min(
      8,
      "password too short"
    ),
  }),
});
export default createSessionSchema;

export type createSessionInput = TypeOf<typeof createSessionSchema>;
