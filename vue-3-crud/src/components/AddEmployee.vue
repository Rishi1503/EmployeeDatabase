<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="employee.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input
          class="form-control"
          id="dob"
          required
          v-model="employee.dob"
          name="dob"
        />
      </div>
      <div class="form-group">
        <label for="phonenumber">Phone Number</label>
        <input
          class="form-control"
          id="phonenumber"
          required
          v-model="employee.phonenumber"
          name="phonenumber"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input
          class="form-control"
          id="address"
          required
          v-model="employee.address"
          name="address"
        />
      </div>
      <button @click="saveEmployee" class="btn btn-success mr-2">Submit</button>
      <button @click="returnEmployeesPage" class="btn btn-primary">Go Back</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button @click="newEmployee" class="btn btn-success mr-2">Add</button>
      <router-link :to="'/employees' " class="btn btn-warning btn-space">Go Back</router-link>
      <!-- <button @click="returnEmployeesPage" class="btn btn-primary btn-space">Go Back</button> -->
    </div>
  </div>
</template>
<script>
import EmployeeDataService from "../services/EmployeeDataService";
import { uuid } from 'vue-uuid'; 
export default {
  name: "add-employee",
  data() {
    return {
      employee: {
        id: uuid.v4(),
        name: "",
        dob: "",
        phonenumber: "",
        address: "",
      },
      submitted: false
    };
  },
  methods: {
    saveEmployee() {
      var data = {
        id: uuid.v4(),
        name: this.employee.name,
        dob: this.employee.dob,
        phonenumber: this.employee.phonenumber,
        address: this.employee.address
      };
      EmployeeDataService.create(data)
        .then(response => {
          if (response.data) {
            this.submitted = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    newEmployee() {
      this.submitted = false;
      this.employee = {};
    },
    returnEmployeesPage() {
      this.$router.push({ name: "employees" });
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>