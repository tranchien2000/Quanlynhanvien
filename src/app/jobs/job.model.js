import mongoose from "mongoose";
const Schema = mongoose.Schema;

const JobSchema = new Schema(
  {
    description: {
      type: String,
      required: "Chưa có mô tả công việc",
    },
    salary: {
      type: String,
      required: "Chưa có mức lương",
    },
    experience: String,
    degree: String,
    number: Number,
    career: {
      type: String,
      required: "Chưa có ngành nghề",
    },
    address: {
      type: String,
      required: "Chưa có địa điểm làm việc",
    },
    position: String,
    waysWorking: String,
    timeTest: String,
    targetGender: String,
    targetAge: String,
    user: {
      type: Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
