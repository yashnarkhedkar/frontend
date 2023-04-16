<template>
    <div class="container">
        <h1>Log in</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            <el-form-item label="Email" prop="email">
                <el-input type="email" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
        </el-form>
        <el-link type="primary" href="/#/signup">Create an account</el-link>
    </div>
</template>


<script>
import signUp from "./Sign-up.vue"
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

export default {
    name: 'login-page',
    data() {
        return {
            components: {
                signUp
            },
            ruleForm: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    { required: true, message: 'Please enter your email', trigger: 'change' }
                ],
                password: [
                    { required: true, message: 'Enter your password', trigger: 'change' },
                    { min: 5, max: 10, message: 'Length should be 5-10 ', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    let headersList = {
                        "Accept": "*/*",
                        "Content-Type": "application/json"
                    }

                    let bodyContent = JSON.stringify({
                        "email": this.ruleForm.email,
                        "password": this.ruleForm.password,
                    });

                    let reqOptions = {
                        url: "http://localhost:5000/login",
                        method: "POST",
                        headers: headersList,
                        data: bodyContent,
                    }

                    let res = await axios.request(reqOptions);
                    console.log(res);

                    const token = res.data.token;
                    if(res.data.message == "Login successful."){
                        localStorage.setItem('token', token);
                        this.$router.push({ path: '/', props: true });
                        this.open1()
                    } else{
                        this.open4()
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        open1() {
            this.$notify({
                title: 'Login Successful',
                type: 'success'
            });
        },
        open4() {
            this.$notify.error({
                title: 'Invalid Credetials',
                message: 'Check you email or password'
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