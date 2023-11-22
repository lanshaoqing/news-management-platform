<template>
    <div>
        <el-card>
            <el-page-header title="新闻管理" icon="null">
                <template #content>
                    <span class="text-large font-600 mr-3"> 新闻列表 </span>
                </template>
            </el-page-header>

            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" />

                <el-table-column prop="category" label="类别">
                    <template #default="scope">
                        {{ categoryForm(scope.row.category) }}
                    </template>
                </el-table-column>

                <el-table-column prop="editTime" label="更新时间">
                    <template #default="scope">
                        {{ formatTime.getTime(scope.row.editTime) }}
                    </template>
                </el-table-column>

                <el-table-column label="是否发布">
                    <template #default="scope">
                        <el-switch v-model="scope.row.isPublish" :active-value="1" :inactive-value="0"
                            @change="handleSwitchChange(scope.row)" />
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">

                        <el-button circle :icon="Star" type="success" @click="handlePreview(scope.row)"></el-button>
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

        <!-- 弹出框 -->
        <el-dialog v-model="dialogVisible" title="预览新闻" width="50%">
            <div>
                <h2>{{ previewData.title }}</h2>
                <div style="font-size: 12px; color: gray;"> {{ formatTime.getTime(previewData.editTime) }}</div>

                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>

                <div v-html="previewData.content" class="htmlContent"></div>
            </div>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getNewsList, updatePublish, deleteNews } from '@/api/news'
import formatTime from '@/util/formatTime'
import { ElMessage } from 'element-plus';
import { Star, Edit, Delete, StarFilled } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const tableData = ref([])
const previewData = ref({})
const dialogVisible = ref(false)
onMounted(() => {
    getTableData()
})
const getTableData = async () => {
    const result = await getNewsList()
    if (result.data.code === 1) {
        tableData.value = result.data.data
        ElMessage.success('获取成功')
    }
}
// 分类信息
const categoryForm = (category) => {
    const arr = ['最新动态', '典型案例', '通知公告']
    return arr[category - 1]
}

const handleSwitchChange = async (item) => {
    await updatePublish(item)
    await getTableData()
}
const handlePreview = (data) => {
    previewData.value = data
    dialogVisible.value = true
}
const handleEdit = (data) => {
    router.push(`/news-manage/editnews/${data.id}`)
}

const handleDelete = async (item) => {
    const result = await deleteNews(item)
    if (result.data.code === 1) {
        ElMessage.success('删除成功')
    }
    await getTableData()
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