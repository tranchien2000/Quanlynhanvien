import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ShiftReportSchema = new Schema({
    time: {
        type: Date,
        required: 'Chưa có thời gian'
    },
    staff: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
    }
})

export default mongoose.model("ShiftReport", ShiftReportSchema);