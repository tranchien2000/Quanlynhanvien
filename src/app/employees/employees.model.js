import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    code: {
        type: String,
        required: 'Chưa có mã',
        unique: true
    },
    name: {
        type: String,
        required: 'Chưa có tên'
    },
    birthday: Date,
    gender: String,
    position: String,
    salary: Number,
    email: String,
    cellphone: String,
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Employee", EmployeeSchema);
