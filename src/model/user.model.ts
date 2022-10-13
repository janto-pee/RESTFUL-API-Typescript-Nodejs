import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(comfirmPassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saleWorkFactory = config.get<number>("saltWorkFactory");
    const salt = await bcrypt.genSalt(saleWorkFactory);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    return next();
  }
});

userSchema.methods.comparePassword = async function (
  confirmPassword: string
): Promise<Boolean> {
  // const user = this as UserDocument;

  return bcrypt
    .compare(confirmPassword, this.password)
    .catch((e: any) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
