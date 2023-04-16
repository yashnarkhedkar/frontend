<template>
  <div id="app">
    <router-view></router-view>
    <div id="code">
        <el-link href="https://github.com/yashnarkhedkar/Login-App" target="_blank">
            <el-button type="primary" icon="el-icon-link">Code</el-button>
        </el-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#app {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#code {
    position: absolute;
    bottom : 20px;
    right : 20px;
}
</style>
