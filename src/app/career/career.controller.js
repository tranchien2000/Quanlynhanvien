import Career from './career.model.js';
import errorHandler from '../errors/errors.controller.js'
import helper from "../../ulti/helper.js";
import _ from "lodash"
class CareerController {
  list = async (req, res) => {
     await Career.find()
     .lean()
      .then(careers => {
        res.jsonp(careers)
      })
      .catch(errorHandler.respondError)

  }
}
export default new CareerController();
