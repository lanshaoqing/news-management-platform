<template>
    <el-row>

        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">
                    {{ formatTime.whichTime(currentNews.editTime) }}
                </div>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider>
                <div v-html="currentNews.content"></div>
            </div>
        </el-col>

        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16px;font-weight: bold;">最新新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item.id" class="text item" style="padding: 14px;" @click="handleChangepage(item.id)">
                    <span>{{ item.title }}</span>
                    <div class="time">
                        {{ formatTime.whichTime(item.editTime) }}
                    </div>
                </div>

            </el-card>
        </el-col>

    </el-row>
</template>

<script setup>
import { watchEffect, ref } from 'vue';
import { getNewsInfo, getTopList } from '@/api/news'
import { useRoute,useRouter } from 'vue-router';
import formatTime from '@/util/formatTime'
import { StarFilled } from '@element-plus/icons-vue'
const route = useRoute()
const currentNews = ref({})
const topNews = ref([])
watchEffect(async () => {
    const params = route.params
    const result1 = await getNewsInfo(params)
    const result2 = await getTopList()
    if (result1.data.code === 1) {
        currentNews.value = result1.data.data[0]
    }
    if (result2.data.code === 1) {
        topNews.value = result2.data.data
    }
})
const router = useRouter()
const handleChangepage = (id) => {
    router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.el-row {
    margin-top: 30px;
}

.time {
    font-size: 13px;
    color: gray;
}
</style>