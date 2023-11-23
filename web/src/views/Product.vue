<template>
    <div>
        <el-carousel height="calc(100vh - 49px)" direction="vertical" :autoplay="false" v-if="loopList.length">
            <el-carousel-item v-for="item in loopList" :key="item.id">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">

                    <el-card class="box-card">
                        <template #header>
                            <div class="card-header">
                                <h3>{{ item.title }}</h3>
                            </div>
                        </template>
                        <div>{{ item.introduction }}</div>
                        <div class="detail">{{ item.detail }}</div>
                    </el-card>

                </div>
            </el-carousel-item>
        </el-carousel>

        <el-empty v-else description="暂无产品" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getProductsList } from '@/api/products'
const loopList = ref([])
onMounted(async () => {
    const result = await getProductsList()
    if (result.data.code === 1) {
        loopList.value = result.data.data
    }
})
</script>
<style lang="scss" scoped>
.item {
    width: 100%;
    height: 100%;
    background-size: cover;
}

.box-card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    position: relative;
    top: 0;
    left: 0;

    .detail {
        margin-top: 20px;
    }
}
</style>