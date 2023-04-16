<template>
    <div class="container">
        <h1>Home Page</h1>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column prop="name" label="Name" width="180">
            </el-table-column>
            <el-table-column prop="email" label="Email" width="180">
            </el-table-column>
            <el-table-column prop="dob" label="Date of birth" width="180">
            </el-table-column>
        </el-table>
        <div id="upper">
            <h4 id="email">Email : {{ this.user.email }} </h4>
            <el-button type="danger" @click="logout">Logout</el-button>
        </div>
    </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwt_decode from 'jwt-decode';
Vue.use(VueAxios, axios)

export default {
    name: 'home-page',
    props : ['email'],
    data() {
        return {
            list: null,
            tableData: [],
            user : ''
        }
    },
    mounted() {
        Vue.axios.get('https://login-app1.onrender.com/allusers')
            .then((res) => {
                this.tableData = res.data
        }),
        this.f();
    },
    methods: {
        tableRowClassName({ rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login'); 
        },
        f(){
            const decoded = jwt_decode(localStorage.getItem('token'));
            this.user = decoded;
        },
    },
}
</script>

<style>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 1/2rem;
    height: 400px;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}

#upper {
    position: absolute;
    display: flex;
    flex-direction: row;
    top : 20px;
    right : 20px;
}

#email{
    margin: 10px;
}
</style>