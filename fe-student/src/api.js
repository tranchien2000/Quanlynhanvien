import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3010',
  json: true
})

export default {
  async execute (method, resource, data, params) {
    return client({
      method,
      url: resource,
      data,
      params
    }).then(req => {
      return req.data
    })
  },
  getStudents (params) {
    return this.execute('get', '/api/student', null, params)
  },
  getStudent (id) {
    return this.execute('get', `/api/student/${id}`)
  },
  createStudent (data) {
    return this.execute('post', '/api/student', data)
  },
  updateStudent (id, data) {
    return this.execute('put', `/api/student/${id}`, data)
  },
  deleteStudent (id) {
    return this.execute('delete', `/api/student/${id}`)
  }
}