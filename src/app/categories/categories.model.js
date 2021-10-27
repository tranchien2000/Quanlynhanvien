import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    code: {
        type: String,
        required: 'Chưa có mã'
    },
    name: {
        type: String,
        required: 'Chưa có tên'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
