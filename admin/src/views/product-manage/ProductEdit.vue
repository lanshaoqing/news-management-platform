<template>
    <div>
        <el-page-header title="产品管理" @back="handleBack()">
            <template #content>
                <span class="text-large font-600 mr-3"> 编辑产品 </span>
            </template>
        </el-page-header>

        <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="80px"
            class="demo-ruleForm">

            <el-form-item label="产品名称" prop="title">
                <el-input v-model="productForm.title" />
            </el-form-item>
            <el-form-item label="产品简要描述" prop="introduction">
                <el-input v-model="productForm.introduction" type="textarea" />
            </el-form-item>
            <el-form-item label="产品详细描述" prop="detail">
                <el-input v-model="productForm.detail" type="textarea" />
            </el-form-item>

            <el-form-item label="产品图片" prop="cover">
                <!--  -->
                <Upload :avatar="productForm.cover" @changeFile="handleChange" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm()">更新产品</el-button>
            </el-form-item>


        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import Upload from '@/components/upload/Upload'
import { getProductInfo } from '@/api/products'
import { upload } from '@/api/upload'
import { ElMessage } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
const route = useRoute()
const productFormRef = ref()
const productForm = reactive({
    title: '',
    introduction: '',
    detail: '',
    cover: '',
    file: null,
})
const productFormRules = reactive({
    title: [
        { required: true, message: '请输入名称', trigger: 'blur' },
    ],
    introduction: [
        { required: true, message: '请输入简要描述', trigger: 'blur' },
    ],
    detail: [
        { required: true, message: '请输入详细描述', trigger: 'blur' },
    ],
    cover: [
        { required: true, message: '请上传产品头像', trigger: 'blur' },
    ]
})
onMounted(() => {
    getData()
})
const getData = async () => {
    const params = route.params
    const result = await getProductInfo(params)
    if (result.data.code === 1) {
        Object.assign(productForm,result.data.data[0])
        ElMessage.success(result.data.message)
    }
}

const handleChange = (file) => {
    productForm.cover = URL.createObjectURL(file)
    productForm.file = file
}

const router = useRouter()
const submitForm = () => {
    productFormRef.value.validate(async (valid) => {
        if (valid) {
            const result = await upload('/adminapi/products/list', productForm)
            if (result.data.code === 1) {
                ElMessage.success(result.data.message)
                router.push('/product-manage/productlist')
            }
        }
    })
}
const handleBack = () => {
    router.back()
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 50px;
}
</style>