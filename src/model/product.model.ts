import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface ProductInput {
  user: UserDocument["_id"];
  title: String;
  description: String;
  price: Number;
  image: String;
}

export interface ProductDocument extends ProductInput, mongoose.Schema {
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, default: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);
export default ProductModel;
