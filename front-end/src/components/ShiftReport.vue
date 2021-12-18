<template>
  <div class="hero">
    <div class="container">
      <p class="lead">Điền mã nhân viên của bạn ở đây để chấm công</p>
      <b-row class="my-1">
        <b-col sm="3">
          <label for="input-small">Code:</label>
        </b-col>
        <b-col sm="5">
          <b-form-input v-model="code" size="sm"></b-form-input>
        </b-col>
        <b-col sm="1">
          <b-button variant="success" v-on:click="check()"
            >Check</b-button
          >
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import api from "@/api";
export default {
  data() {
    return {
      loading: false,
      code: ""
    };
  },
  methods: {
    async check(){
        this.loading = true;
        api.come(this.code)
            .then(() => {
              alert("Chấm công thành công");
            })
            .catch(err => {
                alert(err.response.data.message);
            })
            .finally(() => {
                this.loading = false;
            });

    }
  },
};
</script>

<style>
.hero {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.hero .lead {
  font-weight: 200;
  font-size: 1.5rem;
}
</style>
