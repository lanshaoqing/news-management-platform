<template>
    <div>
        <el-card>
            <el-page-header title="产品管理" icon="null">
                <template #content>
                    <span class="text-large font-600 mr-3"> 产品列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="产品名称" />

                <el-table-column prop="introduction" label="简要描述" />

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>

                        <el-popconfirm title="你确定要删除吗？" confirm-button-text="确定" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row)">
                            <template #reference>
                                <el-button circle :icon="Delete" type="danger"></el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProductsList, deleteProducts } from '@/api/products'
import formatTime from '@/util/formatTime'
import { ElMessage } from 'element-plus';
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const tableData = ref([])
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const result = await getProductsList()
    if (result.data.code === 1) {
        tableData.value = result.data.data
        ElMessage.success(result.data.message)
    }
}

const handleEdit = (data) => {
    router.push(`/product-manage/editproduct/${data.id}`)
}

const handleDelete = async (item) => {
    const result = await deleteProducts(item)
    if (result.data.code === 1) {
        ElMessage.success('删除成功')
        await getTableData()
    }
}

</script>

<style lang="scss" scoped>
.el-table {
    margin-top: 30px;
}

::v-deep .htmlContent {
    img {
        max-width: 100%;
    }
}
</style>