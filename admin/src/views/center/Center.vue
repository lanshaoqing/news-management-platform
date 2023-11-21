<template>
    <div>
        <el-page-header title="企业门户管理系统" icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 个人中心 </span>
            </template>
        </el-page-header>

        <el-row :gutter="20" class="el-row">
            <el-col :span="4">
                <el-card class="box-card">
                    <el-avatar :size="200" :src="avatarUrl" />
                    <h3>{{ store.state.userInfo.username }}</h3>
                    <h3>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h3>
                </el-card>
            </el-col>
            <el-col :span="20">

                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span>个人信息</span>
                        </div>
                    </template>

                    <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px"
                        class="demo-ruleForm">

                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="userForm.username" />
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="userForm.gender" class="m-2" placeholder="Select" style="width: 100%;">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>

                        <el-form-item label="个人简介" prop="introduction">
                            <el-input v-model="userForm.introduction" type="textarea" />
                        </el-form-item>

                        <el-form-item label="头像" prop="avatar">
                            <Upload :avatar="userForm.avatar" @changeFile="handleChange" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="submitForm()">提交</el-button>
                        </el-form-item>

                    </el-form>

                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed, reactive, ref, onMounted } from 'vue';

import { getUserInfo } from '@/api/users'
import { upload } from '@/api/upload'
import { ElMessage } from 'element-plus';
import Upload from '@/components/upload/Upload'
const store = useStore()
const avatarUrl = computed(() => {
    return store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
})
const userFormRef = ref()
const { id, username, gender, introduction, avatar } = store.state.userInfo
const userForm = reactive({
    id,
    username,
    gender,
    introduction,
    avatar,
    file: null
})
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ],
    avatar: [
        { required: true, message: '请上传头像', trigger: 'blur' },
    ]
})

const options = [{ value: 0, label: '保密' }, { value: 1, label: '男' }, { value: 2, label: '女' }]
onMounted(async () => {
    const result = await getUserInfo(userForm.id)
    const { username, gender, introduction } = result.data.data
    userForm.username =  username
    userForm.gender =  gender
    userForm.introduction =  introduction
    ElMessage.success('获取成功')
})
const handleChange = (file) => {
    userForm.avatar = URL.createObjectURL(file)
    userForm.file = file
}
const submitForm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            const result = await upload('adminapi/user/upload', userForm)
            if (result.data.code === 1) {
                store.commit('changeUserInfo', result.data.data)
                ElMessage.success('修改成功')
            }
        }
    })
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 20px;

    .box-card {
        text-align: center;
    }
}
</style>
