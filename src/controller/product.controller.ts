import { Request, Response } from "express";
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
  findAllProducts,
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
    return res.status(200).send(product);
  } catch (error: any) {
    return res.status(400).send(error);
  }
}

export async function findProductHandler(
  req: Request<findProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if (!product) {
      return res.status(403).send(`product not found`);
    }
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error);
  }
}

export async function updateProductHandler(
  req: Request<updateProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;
    console.log("userId: ", userId);

    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).send("No product found");
    }

    console.log("product.user: ", String(product.user));
    if (String(product.user) !== userId) {
      return res.status(403).send("unauthorised");
    }

    const updatedProduct = await updateProduct(
      { productId },
      { ...update },
      { new: true }
    );
    console.log("updatedProduct: ", updatedProduct);
    return res.status(200).send(updatedProduct);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function deleteProductHandler(
  req: Request<deleteProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const product = await findProduct({ productId });
    if (!product) {
      return res.status(400).send("product not found");
    }

    if (String(product.user) !== userId) {
      return res.status(400).send("unauthorized user");
    }

    await deleteProduct({ productId });
    res.status(200).send("succesfully deleted");
  } catch (error) {
    res.status(400).send(error);
  }
}

export async function findAllProductsHandler(req: Request, res: Response) {
  try {
    const products = await findAllProducts();
    if (!products) {
      return res.send("No product found");
    }
    return res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
}
