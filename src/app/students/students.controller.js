import Student from "./students.model.js";
import errorHandler from "../errors/errors.controller.js";
import _ from "lodash";
import moment from 'moment';
class StudentController {
  list = async (req, res) => {
    const { id, name, startPoint, endPoint, finalYear } = req.query;
    const query = Student.find();
    query.where({
      deleted: {
        $ne: true,
      },
    });
    if(id){
      query.where({
        studentId: {
          $regex: id
        }
      })
    }
    if(name){
      query.where({
        name: {
          $regex: name
        }
      })
    }
    if (startPoint && endPoint) {
      query.where({
        avgPointFirstSemester: {
          $gte: startPoint,
          $lte: endPoint,
        },
      });
    }
    if(finalYear){
      const firstDate = moment().set('year', 2000).startOf('year').toDate()
      const lastDate = moment().set('year', 2000).endOf('year').toDate()
      query.where({
        birthday: {
          $gte: firstDate,
          $lte: lastDate
        }
      })
    }
    query
      .lean()
      .then((careers) => {
        res.jsonp(careers);
      })
      .catch(errorHandler.respondError);
  };
  studentById = async function (req, res, next, id) {
    await Student.findById(id)
      .then((student) => {
        req.student = student;
        return next();
      })
      .catch((err) => {
        return next(new Error(`Failed to load student  (${err})`));
      });
  };
  read = (req, res) => {
    res.jsonp(req.student);
  };
  create = async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.jsonp("OK");
  };
  update = async (req, res) => {
    let student = req.student;
    student = _.assignIn(student, req.body);
    await student.save();
    res.jsonp("OK");
  };
  delete = async (req, res) => {
    let student = req.student;
    student.deleted = true;
    await student.save();
    res.jsonp("OK");
  };
}
export default new StudentController();
