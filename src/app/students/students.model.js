import mongoose from "mongoose";
const Schema = mongoose.Schema;

const StudentSchema = new Schema(
  {
    studentId: {
        type: String,
        required: 'Chưa có mã',
        unique: true
    },
    name: {
        type: String,
        required: 'Chưa có tên'
    },
    birthday: Date,
    avgPointFirstSemester: Number,
    deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);
