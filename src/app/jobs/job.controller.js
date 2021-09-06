import Job from "./job.model.js";
import errorHandler from "../errors/errors.controller.js";
import helper from "../../ulti/helper.js";
import _ from "lodash";
class JobController {
  create = async (req, res) => {
    const job = new Job(req.body);
    job
      .save()
      .then((newJob) => {
        res.jsonp(newJob);
      })
      .catch(errorHandler.respondError);
  };
  list = async (req, res) => {
    const rolesUser = req.roles;
    const query = Job.find();
    if (!_.includes(rolesUser, "admin")) {
      query.where({
        user: helper.getObjectId(req.userId),
      });
    }
    query
      .lean()
      .then((jobs) => {
        res.jsonp(jobs);
      })
      .catch(errorHandler.respondError);
  };
  find = async (req, res) => {
    const { text, place, career } = req.body;
    const userId = req.userId
    const query = Job.aggregate()
      .match({
        applyUsers: {
          $nin: [helper.getObjectId(userId)]
        }
      })
    if (text) {
      query.match({
        description: {
          $regex: text,
        },
      });
    }
    if (place) {
      query.match({
        address: place,
      });
    }
    if (career) {
      query
        .lookup({
          from: "careers",
          localField: "career",
          foreignField: "_id",
          as: "career",
        })
        .unwind("$career")
        .match({
          "career.code": career,
        });
    }
    const listJob = await query.exec();
    res.jsonp(listJob);
  };
  apply = async (req, res) => {
    const job = req.job;
    job.applyUsers.push(helper.getObjectId(req.userId));
    await job.save()
    res.jsonp(job)
  };
  jobById = async (req, res, next, id) => {
    await Job.findById(id)
      .then((job) => {
        req.job = job;
        return next();
      })
      .catch((err) => {
        return next(new Error(`Failed to load Job (${err})`));
      });
  };
}
export default new JobController();
