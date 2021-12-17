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
  getEmployees (params) {
    return this.execute('get', '/api/employees', null, params)
  },
  getEmployee (id) {
    return this.execute('get', `/api/employees/${id}`)
  },
  createEmployee (data) {
    return this.execute('post', '/api/employees', data)
  },
  updateEmployee (id, data) {
    return this.execute('put', `/api/employees/${id}`, data)
  },
  deleteEmployee (id) {
    return this.execute('delete', `/api/employees/${id}`)
  }
}