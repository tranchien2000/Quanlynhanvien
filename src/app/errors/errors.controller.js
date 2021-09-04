import _ from 'lodash'
import logger from '../../config/logger.js'

class ErrorHandler {
  getErrorMessage = (err) => {
    var message = ''
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = this.getUniqueErrorMessage(err)
          break
        default:
          message = 'Có lỗi xảy ra.'
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message
      }
    }

    if (!message && err.message) message = err.message
    if (!message) message = err
    return message
  }

  respondError(res, req, next) {
    return (err) => {
      logger.log('error', this.getErrorMessage(err), next)
      res.status(err.status || 500).json({ message: this.getErrorMessage(err) })
    }
  }
}
export default new ErrorHandler()
