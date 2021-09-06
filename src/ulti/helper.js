import _ from 'lodash'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId
class Helper {
  getObjectId = function (obj) {
    const id = _.get(obj, "_id") || obj;
    if (_.isString(id) && ObjectId.isValid(id)) return new ObjectId(id);
    return id;
  };
}
export default new Helper();
