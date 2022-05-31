<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/employees" class="navbar-brand">Employee App</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/employees" class="nav-link">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add Employee</router-link>
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
