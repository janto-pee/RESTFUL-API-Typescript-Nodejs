import { object, string, number, TypeOf } from "zod";

const bodyPayload = {
  body: object({
    title: string({ required_error: " title is required" }),
    description: string({ required_error: "description is required" }),
    price: number({ required_error: "price is required " }),
    image: string({ required_error: " image is required " }),
  }),
};

const paramPayload = {
  params: object({
    productId: number({ required_error: "this field is required" }),
  }),
};

export const createProductSchema = object({
  ...bodyPayload,
});
export const findProductSchema = object({
  ...paramPayload,
});
export const updateProductSchema = object({
  ...bodyPayload,
  ...paramPayload,
});
export const deleteProductSchema = object({
  ...paramPayload,
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type findProductInput = TypeOf<typeof findProductSchema>;
export type updateProductInput = TypeOf<typeof updateProductSchema>;
export type deleteProductInput = TypeOf<typeof deleteProductSchema>;
