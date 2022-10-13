import { Request, Response } from "express";
import ProductModel from "../model/product.model";
import {
  createProductInput,
  deleteProductInput,
  findProductInput,
  updateProductInput,
} from "../schema/product.schema";
import { createUserInput } from "../schema/user.schema";
import {
  createProduct,
  deleteProduct,
  findProduct,
  updateProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, createProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const body = req.body;
    const product = await createProduct({ ...body, user: userId });
    res.status(200).send(product);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function findProductHandler(
  req: Request<findProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const product = await findProduct({ productId });
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
}
export async function updateProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    const update = req.body;
    const updatedProduct = await updateProduct(
      { productId },
      {},
      { ...update }
    );
    res.status(200).send(updatedProduct);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}
export async function deleteProductHandler(
  req: Request<deleteProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;
    await deleteProduct({ productId });
    res.status(200).send("succesfully deleted");
  } catch (error) {
    res.status(400).send(error);
  }
}
