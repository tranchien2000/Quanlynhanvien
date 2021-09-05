import mongoose from "mongoose";
const Schema = mongoose.Schema;

const validateLocalStrategyProperty = function (property) {
  return (this.provider !== "local" && !this.updated) || property.length;
};

const validateLocalStrategyPassword = function (password) {
  return this.provider !== "local" || (password && password.length > 6);
};

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: "",
      validate: [validateLocalStrategyProperty, "Chưa có tên"],
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
      validate: [validateLocalStrategyProperty, "Chưa có họ và đệm"],
    },
    displayName: String,
    email: {
      type: String,
      trim: true,
      default: "",
      validate: [validateLocalStrategyProperty, "Chưa có địa chỉ email"],
      match: [/.+@.+\..+/, "Địa chỉ email không hợp lệ"],
    },
    cellphone: {
      type: String,
      default: "",
      validate: [validateLocalStrategyProperty, "Chưa có số điện thoại"],
    },
    username: {
      type: String,
      unique: "testing error message",
      required: "Please fill in a username",
      trim: true,
    },
    password: {
      type: String,
      default: "",
      validate: [validateLocalStrategyPassword, "Password should be longer"],
    },
    roles: {
      type: [
        {
          type: String,
        },
      ],
      default: ["user"],
    },
    careCategories: String
  },
  { timestamps: true }
);
UserSchema.pre("validate", function (next) {
  const user = this;
  user.displayName = `${user.lastName} ${user.firstName}`;
  next();
});

UserSchema.methods.hasRole = function (role) {
  return this.roles.includes(role);
};
export default mongoose.model('User', UserSchema)