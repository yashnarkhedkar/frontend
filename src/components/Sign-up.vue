<template>
    <div class="container">
        <h1>Sign Up</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Name" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="DOB" prop="date">
                <el-input type="date" v-model="ruleForm.date"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
        </el-form>
        <el-link type="primary" href="/#/login">Exsiting user? Login</el-link>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios' //this line is important to remove 'protocol' ERROR
Vue.use(VueAxios, axios)

export default {
    name: 'Sign-Up',
    data() {
        return {
            ruleForm: {
                name: '',
                email: '',
                password: '',
                date: ''
            },
            rules: {
                name: [
                    { required: true, message: 'Please enter your name', trigger: 'blur' },
                    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: 'Please enter your email', trigger: 'change' }
                ],
                password: [
                    { required: true, message: 'Enter your password', trigger: 'change' },
                    { min: 5, max: 10, message: 'Length should be 5-10 ', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: 'Please pick a time', trigger: 'change' }
                ],
            }
        };
    },
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate((valid) => {
                if (valid) {
                    Vue.axios.get("https://login-app1.onrender.com/add_user", {
                        params: this.ruleForm
                    }, { withCredentials: true })
                    .then((res) => {
                        console.log(res);
                        this.$router.push('/');
                    })
                    .catch((err) => {
                        console.error(err);
                    });
                    this.open1();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(ruleForm) {
            this.$refs[ruleForm].resetFields();
        },
        open1() {
            this.$notify({
                title: 'User created',
                message: 'Please Login',
                type: 'success'
            });
        },
    }
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
</style>