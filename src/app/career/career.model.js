import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CareerSchema = new Schema(
  {
    code: {
        type: String,
        required: 'Chưa có mã ngành nghề'
    },
    name: {
        type: String,
        required: 'Chưa có tên ngành nghề'
    }
  },
  { timestamps: true }
);

export default mongoose.model("Career", CareerSchema);
