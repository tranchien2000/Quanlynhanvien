import Job from "./job.model.js";
import errorHandler from '../errors/errors.controller.js'
import helper from "../ulti/helper.js";
import _ from "lodash"
class JobController {
  create = async (req, res) => {
      const job = new Job(req.body)
      job.save()
        .then((newJob) => {
            res.jsonp(newJob)
        })
        .catch(errorHandler.respondError)
  };
  list = async (req, res) => {
      const rolesUser = req.roles
      const query = Job.find()
      if(!_.includes(rolesUser, 'admin')){
          query.where({
              user: helper.getObjectId(req.userId)
          })
      }
      query.lean().then((jobs) => {
          res.jsonp(jobs)
      })
      .catch(errorHandler.respondError)

  }
}
export default new JobController();
