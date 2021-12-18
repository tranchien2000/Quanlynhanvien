import ShiftReport from "./shiftreports.model.js";
import moment from "moment";
import Employee from "../employees/employees.model.js";
class ShiftReportController {
  async come(code) {
    const today = moment();
    const startTime = today.startOf("day");
    const endTime = today.endOf("day");
    try {
        const staff = await Employee.findOne({code}).lean();
        if(!staff){
            throw new Error("Nhân viên không tồn tại");
        }
      const checkDuplicate = await ShiftReport.findOne({
        staff: staff._id,
        time: {
          $gte: startTime,
          $lte: endTime,
        },
      }).lean();
      if (checkDuplicate) {
        throw new Error("Nhân viên đã chám công trong ngày này");
      }
      const shiftReport = new ShiftReport({
        staff: staff._id,
        time: today,
      });
      await shiftReport.save();
    } catch (err) {
      throw err;
    }
  }
  async calculateSalary(staffId) {
    const totalShifts = await ShiftReport.count({ staff: staffId });
    const staff = await Employee.findById(staffId).select("salary").lean();
    const salary = staff.salary * totalShifts;
    return salary;
  }
}

export default new ShiftReportController();
