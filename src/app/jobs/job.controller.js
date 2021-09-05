import Job from "./job.model.js";
import errorHandler from '../errors/errors.controller.js'
class JobController {
  create = async (req, res) => {
      const job = new Job(req.body)
      job.save()
        .then((newJob) => {
            res.jsonp(newJob)
        })
        .catch(errorHandler.respondError)
  };
}
export default new JobController();
