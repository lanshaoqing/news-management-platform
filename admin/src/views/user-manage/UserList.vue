<template>
    <div>
        <el-card>
            <el-page-header title="用户管理" icon="null">
                <template #content>
                    <span class="text-large font-600 mr-3"> 用户列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="username" label="用户名" width="180" />

                <el-table-column label="头像">
                    <template #default="scope">
                        <div v-if="scope.row.avatar">
                            <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
                        </div>
                        <div v-else>
                            <el-avatar :size="50"
                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="角色">
                    <template #default="scope">
                        <el-tag v-if="scope.row.role === 1" class="ml-2" type="danger">管理员</el-tag>
                        <el-tag v-else class="ml-2" type="success">编辑</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button size="small" type="danger">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">

            <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userForm.password" />
                </el-form-item>

                <el-form-item label="角色" prop="role">
                    <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width: 100%;">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction" type="textarea" />
                </el-form-item>
            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="handleEditConfirm()">
                        确认
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getUserList, deleteUser, editUser } from '@/api/users'
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false)
const tableData = ref([])
const userFormRef = ref()
const userForm = reactive({
    id: '',
    username: '',
    password: '',
    role: 2,//1是管理员，2是编辑
    introduction: ''
})
const userFormRules = reactive({
    username: [
        { required: true, message: '请输入名字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    role: [
        { required: true, message: '请选择权限', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入介绍', trigger: 'blur' },
    ]
})
const options = [{ value: 1, label: '管理员' }, { value: 2, label: '编辑' }]
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const result = await getUserList()
    if (result.data.code === 1) {
        tableData.value = result.data.data
        ElMessage.success(result.data.message)
    }
}

const handleEdit = (data) => {
    const { username, password, role, introduction, id } = data
    userForm.username = username
    userForm.password = password
    userForm.role = role
    userForm.introduction = introduction
    userForm.id = id
    dialogVisible.value = true
}
const handleDelete = async (data) => {
    const result = await deleteUser(data.id)
    if (result.data.code === 1) {
        ElMessage.success(result.data.message)
        getTableData()
    }
}
const handleEditConfirm = () => {
    userFormRef.value.validate(async (valid) => {
        if (valid) {
            // console.log(userForm);
            const result = await editUser(userForm)
            if (result.data.code === 1) {
                ElMessage.success(result.data.message)
                dialogVisible.value = false
                getTableData()
            }
        } else {
            return false
        }
    })

}

</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 30px;
}
</style>