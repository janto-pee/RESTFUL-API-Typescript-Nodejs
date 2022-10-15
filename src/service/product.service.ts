import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocument,
  ProductInput,
} from "../model/product.model";

export async function createProduct(input: ProductInput) {
  const product = await ProductModel.create(input);
  return product;
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  const product = await ProductModel.findOne(query, {}, options);
  return product;
}

export async function updateProduct(
  query: FilterQuery<ProductDocument>,
  input: UpdateQuery<ProductDocument>,
  option: QueryOptions = { new: true }
) {
  return ProductModel.findOneAndUpdate(query, input, option);
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.findOneAndDelete(query);
}

// Find all products
export async function findAllProducts() {
  const products = await ProductModel.find();
  return products;
}
