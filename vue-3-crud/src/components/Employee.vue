<template>
  <div v-if="currentEmployee" class="edit-form">
    <h4>Employee</h4>
    <form> 
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name"
          v-model="currentEmployee.name"
        />
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth</label>
        <input type="text" class="form-control" id="dob"
          v-model="currentEmployee.dob"
        />
      </div>
      <div class="form-group">
        <label for="phonenumber">Phone</label>
        <input type="text" class="form-control" id="phonenumber"
          v-model="currentEmployee.phone"
        />
      </div>
      <div class="form-group">
        <label for="address">Address</label>
        <input type="text" class="form-control" id="address"
          v-model="currentEmployee.address"
        />
      </div>
    </form>
    <button @click="deleteEmployee" class="btn btn-danger mr-2">Delete</button>
    <button @click="updateEmployee" class="btn btn-success mr-2">Update</button>
    <button @click="returnEmployeesPage" class="btn btn-primary btn-space">Go Back</button>
    <br>
    <br>
    <p>{{ message }}</p>
  </div>
</template>
<script>
import EmployeeDataService from "../services/EmployeeDataService";
export default {
  name: "employee-detail",
  data() {
    return {
      currentEmployee: null,
      message: ''
    };
  },
  methods: {
    async getEmployee(id) {
      await EmployeeDataService.get(id)
        .then(response => {
          this.currentEmployee = response.data[0];
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateEmployee() {
      EmployeeDataService.update(this.currentEmployee.id, this.currentEmployee)
        .then(response => {
          console.log(response.data);
          this.message = 'The employee was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteEmployee() {
      if (confirm('Are you sure?')) {
        EmployeeDataService.delete(this.currentEmployee.id)
          .then(response => {
            console.log(response.data);
            this.returnEmployeesPage();
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    returnEmployeesPage() {
      this.$router.push({ name: "employees-list" });
    }
  },
  async mounted() {
    this.message = '';
    this.getEmployee(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>