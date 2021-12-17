import Employee from "./employees.model.js";
import errorHandler from "../errors/errors.controller.js";
import _ from "lodash";
import moment from 'moment';
class EmployeeController {
  list = async (req, res) => {
    const { keyword } = req.query;
    const query = Employee.find();
    query.where({
      deleted: {
        $ne: true,
      },
    });
    if(keyword){
      query.or([
        {
          code: {
            $regex: keyword,
          }
        }, {
          name: {
            $regex: keyword,
          }
        }
      ])
    }
    query
      .lean()
      .then((employees) => {
        console.log(employees);
        res.jsonp(employees);
      })
      .catch(errorHandler.respondError);
  };
  employeeById = async function (req, res, next, id) {
    await Employee.findById(id)
      .then((employee) => {
        req.employee = employee;
        return next();
      })
      .catch((err) => {
        return next(new Error(`Failed to load Employee  (${err})`));
      });
  };
  read = (req, res) => {
    res.jsonp(req.employee);
  };
  create = async (req, res) => {
    const employee = new Employee(req.body);
    await employee.save();
    res.jsonp("OK");
  };
  update = async (req, res) => {
    let employee = req.employee;
    employee = _.assignIn(employee, req.body);
    await employee.save();
    res.jsonp("OK");
  };
  delete = async (req, res) => {
    let employee = req.employee;
    employee.deleted = true;
    await employee.save();
    res.jsonp("OK");
  };
}
export default new EmployeeController();
