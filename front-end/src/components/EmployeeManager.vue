<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Employees Manager</h1>
    <b-row class="my-1">
      <b-col sm="3">
        <label for="input-small">Search:</label>
      </b-col>
      <b-col sm="5">
        <b-form-input v-model="params.keyword" size="sm"></b-form-input>
      </b-col>
      <b-col sm="1">
        <b-button variant="success" v-on:click="refreshEmployees(params)">Search</b-button>
      </b-col>
    </b-row>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Birthday</th>
              <th>Gender</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Email</th>
              <th>Cellphone</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee._id">
              <td>{{ employee.code }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.birthday | momentDate("DD/MM/YYYY") }}</td>
              <td>{{ employee.gender }}</td>
              <td>{{ employee.position }}</td>
              <td>{{ employee.salary }}</td>
              <td>{{ employee.email }}</td>
              <td>{{ employee.cellphone }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateEmployeeToEdit(employee)"
                  >Edit</a
                >
                -
                <a href="#" @click.prevent="deleteEmployee(employee._id)"
                  >Delete</a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card
          :title="
            model._id
              ? 'Edit Employee ID#' + model.code
              : 'New Employee'
          "
        >
          <form @submit.prevent="saveEmployee">
            <b-form-group label="Code">
              <b-form-input
                type="text"
                v-model="model.code"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Birthday">
              <date-picker style="width:100%" v-model="model.birthday" valueType="format"></date-picker>
            </b-form-group>
            <b-form-group label="Gender">
              <b-form-select v-model="model.gender" :options="genders"></b-form-select>
            </b-form-group>
            <b-form-group label="Position">
              <b-form-input type="text" v-model="model.position"></b-form-input>
            </b-form-group>
            <b-form-group label="Salary">
              <b-form-input type="text" v-model="model.salary"></b-form-input>
            </b-form-group>
            <b-form-group label="Email">
              <b-form-input type="text" v-model="model.email"></b-form-input>
            </b-form-group>
            <b-form-group label="Cellphone">
              <b-form-input type="text" v-model="model.cellphone"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Employee</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import api from "@/api";
import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
export default {
  components: { DatePicker },
  data() {
    return {
      loading: false,
      students: [],
      model: {},
      params: {},
      genders: ['Nam', 'Nữ', 'Khác'],
    };
  },
  async created() {
    this.refreshEmployees();
  },
  methods: {
    async refreshEmployees(params) {
      this.loading = true;
      this.employees = await api.getEmployees(params);
      this.loading = false;
    },
    async populateEmployeeToEdit(employee) {
      this.model = Object.assign({}, employee);
    },
    async saveEmployee() {
      if (this.model._id) {
        await api.updateEmployee(this.model._id, this.model);
      } else {
        await api.createEmployee(this.model);
      }
      this.model = {}; // reset form
      await this.refreshEmployees();
    },
    async deleteEmployee(_id) {
      if (confirm("Are you sure you want to delete this Employee?")) {
        if (this.model._id === _id) {
          this.model = {};
        }
        await api.deleteEmployee(_id);
        await this.refreshEmployees();
      }
    },
  },
};
</script>