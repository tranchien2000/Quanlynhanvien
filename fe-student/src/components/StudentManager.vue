<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Students Manager</h1>
    <b-row class="my-1">
      <b-col sm="1">
        <label for="input-small">Id:</label>
      </b-col>
      <b-col sm="1">
        <b-form-input v-model="params.id" size="sm"></b-form-input>
      </b-col>
      <b-col sm="1">
        <label for="input-small">Name:</label>
      </b-col>
      <b-col sm="1">
        <b-form-input v-model="params.name" size="sm"></b-form-input>
      </b-col>
      <b-col sm="1">
        <label for="input-small">Avg:</label>
      </b-col>
      <b-col sm="1">
        <b-form-input type="text" v-model="params.startPoint" size="sm"></b-form-input>
      </b-col>
      -
      <b-col sm="1">
        <b-form-input type="text" v-model="params.endPoint" size="sm"></b-form-input>
      </b-col>
       <b-col sm="1">
        <label for="input-small">Final-year Student :</label>
      </b-col>
      <b-col sm="1">
        <b-form-checkbox type="checkbox" v-model="params.finalYear" size="sm"></b-form-checkbox>
      </b-col>
      <b-col sm="1">
        <b-button variant="success" v-on:click="refreshStudents(params)">Search</b-button>
      </b-col>
    </b-row>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Birthday</th>
              <th>Avg Point</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student._id">
              <td>{{ student.studentId }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.gender }}</td>
              <td>{{ student.birthday | momentDate("DD/MM/YYYY") }}</td>
              <td>{{ student.avgPointFirstSemester }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateStudentToEdit(student)"
                  >Edit</a
                >
                -
                <a href="#" @click.prevent="deleteStudent(student._id)"
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
              ? 'Edit Student ID#' + model.studentId
              : 'New Student'
          "
        >
          <form @submit.prevent="saveStudent">
            <b-form-group label="Student Id">
              <b-form-input
                type="text"
                v-model="model.studentId"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <b-form-group label="Gender">
              <b-form-select v-model="model.gender" :options="genders"></b-form-select>
            </b-form-group>
            <b-form-group label="Birthday">
              <date-picker style="width:100%" v-model="model.birthday" valueType="format"></date-picker>
            </b-form-group>
            <b-form-group label="AvgPoint">
              <b-form-input
                type="text"
                v-model="model.avgPointFirstSemester"
                placeholder="10.00"
              ></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Student</b-btn>
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
      genders: ['Nam', 'Nữ', 'Khác']
    };
  },
  async created() {
    this.refreshStudents();
  },
  methods: {
    async refreshStudents(params) {
      this.loading = true;
      this.students = await api.getStudents(params);
      this.loading = false;
    },
    async populateStudentToEdit(student) {
      this.model = Object.assign({}, student);
    },
    async saveStudent() {
      if (this.model._id) {
        await api.updateStudent(this.model._id, this.model);
      } else {
        await api.createStudent(this.model);
      }
      this.model = {}; // reset form
      await this.refreshStudents();
    },
    async deleteStudent(_id) {
      if (confirm("Are you sure you want to delete this Student?")) {
        // if we are editing a Student we deleted, remove it from the form
        if (this.model._id === _id) {
          this.model = {};
        }
        await api.deleteStudent(_id);
        await this.refreshStudents();
      }
    },
  },
};
</script>