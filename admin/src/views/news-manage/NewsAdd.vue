<template>
    <div>
        <el-page-header title="新闻管理" icon="null">
            <template #content>
                <span class="text-large font-600 mr-3"> 创建新闻 </span>
            </template>
        </el-page-header>

        <el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm">

            <el-form-item label="标题" prop="title">
                <el-input v-model="newsForm.title" />
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <editor @event="handleChange" />
            </el-form-item>

            <el-form-item label="类别" prop="category">
                <el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width: 100%;">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="封面" prop="cover">
                <Upload :avatar="newsForm.cover" @changeFile="handleUploadChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">添加新闻</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Upload from '@/components/upload/Upload'
import editor from '@/components/editor/Editor'
import { upload } from '@/api/upload'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router = useRouter()
const newsFormRef = ref()
const newsForm = reactive({
    title: '',
    content: '',
    category: 1,//1最新动态，2典型案例,3通知公告
    cover: '',
    file: null,
    isPublish: 0,//0未发布，1已发布
    ifsure: false
})
// onMounted(() => {
//     newsForm.ifsure = data.ifsure
// })

const contentValidate = (rule, value, callback) => {
    if (newsForm.ifsure) {
        callback();
    } else {
        callback(new Error('请输入内容'));
    }
}

const newsFormRules = {
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    content: [
        {
            required: true,
            validator: contentValidate, message: '请输入内容', trigger: 'blur'
        }
    ],
    category: [
        { required: true, message: '请选择分类', trigger: 'blur' }
    ],
    cover: [
        { required: true, message: '请上传图片', trigger: 'blur' }
    ]
}
const options = [{ value: 1, label: '最新动态' }, { value: 2, label: '典型案例' }, { value: 3, label: '通知公告' }]

const handleChange = (data) => {
    newsForm.ifsure = data.ifsure
    newsForm.content = data.valueHtml
}
const handleUploadChange = (file) => {
    newsForm.cover = URL.createObjectURL(file)
    newsForm.file = file
}
const submitForm = () => {
    newsFormRef.value.validate(async (valid) => {
        if (valid) {
            await upload('adminapi/news/add', newsForm)
            ElMessage.success('创建成功')
        }
    })
}

</script>

<style lang="scss" scoped>
.el-form {
    margin-top: 40px;
}
</style>