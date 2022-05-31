<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Employees List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: id == currentID}"
          v-for="(employee, id) in employees"
          :key="id"
          @click="setActiveEmployee(employee, id)"
        >
          {{ employee.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentEmployee">
        <h4>Employee</h4>
        <div>
          <label><strong>ID:</strong></label> {{ currentEmployee.id }}
        </div>
        <div>
          <label><strong>Name:</strong></label> {{ currentEmployee.name }}
        </div>
        <div>
          <label><strong>Date of Birth:</strong></label> {{ currentEmployee.dob }}
        </div>
        <div>
          <label><strong>Phone Number:</strong></label> {{ currentEmployee.phonenumber }}
        </div>
        <div>
          <label><strong>Address:</strong></label> {{ currentEmployee.address }}
        </div>
        <router-link :to="'/employees/' + currentEmployee.id" class="btn btn-warning">Edit</router-link>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Employee...</p>
      </div>
    </div>
  </div>
</template>
<script>
import EmployeeDataService from "../services/EmployeeDataService";
export default {
  name: "employees-list",
  data() {
    return {
      employees: [],
      currentEmployee: null,
      currentID: -1,
    };
  },
  methods: {
    retrieveEmployees() {
      EmployeeDataService.getAll()
        .then(response => {
          this.employees = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveEmployees();
      this.currentEmployee = null;
      this.currentID = -1;
    },
    setActiveEmployee(employee, id) {
      this.currentEmployee = employee;
      this.currentID = employee ? id : -1;
    },
  },
  mounted() {
    this.retrieveEmployees();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>