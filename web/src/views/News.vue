<template>
    <div class="container">
        <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/newsbig.png')})` }">
        </div>

        <div class="news">
            <p>新闻资讯</p>
            <p>为你推荐公司的前沿资讯，让您随时了解行业动态！</p>
        </div>

        <div class="search">
            <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
                <template #reference>
                    <el-input v-model="searchText" class="w-50 m-2" placeholder="请输入新闻关键字" :prefix-icon="Search"
                        type="search" @blur="visible = false" @input="visible = true" size="large" />
                </template>
                <div v-if="searchnewsList.length">
                    <div class="search-item" v-for="data in searchnewsList" :key="data.id"
                        @click="handleChangepage(data.id)">{{ data.title }}</div>
                </div>
                <div v-else>
                    <el-empty description="无结果" :image-size="50" />
                </div>
            </el-popover>
        </div>

        <div class="topnews">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in topnewsList" :key="item.id">
                    <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangepage(item.id)">
                        <div class="image" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }"></div>
                        <div style="padding: 14px">
                            <span>{{ item.title }}</span>
                            <div class="bottom">
                                <time class="time">{{ formatTime.whichTime(item.editTime) }}</time>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <el-tabs style="margin: 20px;" v-model="whichTab" class="demo-tabs">
            <el-tab-pane v-for="item in tablist" :key="item.name" :label="item.label" :name="item.name">
                <el-row :gutter="20">

                    <el-col :span="18">
                        <div v-for="data in tabnews[item.name]" :key="data.id" style="padding: 10px;">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="handleChangepage(data.id)">
                                <div class="tab-image"
                                    :style="{ backgroundImage: `url(http://localhost:3000${data.cover})` }">
                                </div>
                                <div style="padding: 14px;float: left;">
                                    <span>{{ data.title }}</span>
                                    <div class="bottom">
                                        <time class="tab-time">{{ formatTime.whichTime(data.editTime) }}</time>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-col>

                    <el-col :span="6">
                        <el-timeline>
                            <el-timeline-item v-for="data in tabnews[item.name]" :key="data.id"
                                :timestamp="formatTime.whichTime(data.editTime)">
                                {{ data.title }}
                            </el-timeline-item>
                        </el-timeline>
                    </el-col>

                </el-row>
            </el-tab-pane>
        </el-tabs>

        <el-backtop :right="100" :bottom="100" :visibility-height="100" />
    </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted, computed } from 'vue';
import { getNewsList } from '@/api/news'
import formatTime from '@/util/formatTime'
import { useRouter } from 'vue-router';
import _ from 'lodash'
const searchText = ref('')
const visible = ref(false)
const newsList = ref([])
const whichTab = ref(1)
onMounted(async () => {
    const result = await getNewsList()
    if (result.data.code === 1) {
        newsList.value = result.data.data
    }
})
const searchnewsList = computed(() => {
    return searchText.value ? newsList.value.filter(item => item.title.includes(searchText.value)) : []
})

const topnewsList = computed(() => {
    return newsList.value.slice(0, 4)
})

const tablist = [
    {
        label: '最新动态', name: 1
    },
    {
        label: '典型案例', name: 2
    },
    {
        label: '通知公告', name: 3
    }
]
const tabnews = computed(() => {
    return _.groupBy(newsList.value, item => item.category)
})
const router = useRouter()
const handleChangepage = (id) => {
    router.push(`/news/${id}`)
}
</script>

<style lang="scss" scoped>
.container {
    position: relative;

    .news-header {
        width: 100%;
        height: 400px;
        background-size: cover;
    }

    .news {
        position: absolute;
        top: 180px;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;

        p:nth-child(1) {
            font-size: 40px;
            font-weight: 600;
            color: black;
        }

        p:nth-child(2) {
            margin-top: 20px;
            font-weight: 100;
            color: #fff;
            font-size: 20px;
        }
    }

    .search {
        position: absolute;
        top: 300px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;

        .el-input {
            width: 50%;
        }
    }
}

.search-item {
    height: 50px;
    line-height: 50px;

    &:hover {
        background-color: whitesmoke;
        color: red;
    }
}

.topnews {
    margin: 20px;

    .image {
        width: 100%;
        height: 150px;
        background-size: cover;
    }

    .title {
        font-size: 13px;
        color: gray;
    }
}

.tab-image {
    width: 150px;
    height: 100px;
    background-size: cover;
    float: left;

}

.tab-time {
    font-size: 13px;
    color: gray;
}
</style>