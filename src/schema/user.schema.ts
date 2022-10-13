import { Omit } from "lodash";
import { object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "This field is required",
    }),
    email: string({ required_error: "This field is required" }).email(
      "Not a valid email address"
    ),
    password: string({
      required_error: "This field is required",
    }).min(6, "Password too short"),
    confirmPassword: string({
      required_error: "This field is required",
    }).min(6, "Password too short"),
  }).refine((data) => data.password == data.confirmPassword, {
    message: `passwords don't match`,
    path: ["confirmPassword"],
  }),
});

export type createUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.confirmPassword"
>;
// export type CreateUserInput = Omit<
//   TypeOf<typeof createUserSchema>,
//   "body.passwordConfirmation"
// >;
