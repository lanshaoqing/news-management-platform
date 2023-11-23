<template>
    <div class="container">

        <el-carousel height="calc(100vh - 59px)">
            <el-carousel-item :key="1">
                <div :style="{ backgroundImage: `url(${require('@/assets/home1.png')})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="2">
                <div :style="{ backgroundImage: `url(${require('@/assets/home2.png')})` }"></div>
            </el-carousel-item>
            <el-carousel-item :key="3">
                <div :style="{ backgroundImage: `url(${require('@/assets/home3.png')})` }"></div>
            </el-carousel-item>
        </el-carousel>

        <div class="center">互联网</div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.el-carousel div{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.container {
    position: relative;
}

.center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    line-height: 100px;
    font-size: 60px;
    color: #1890ff;
    text-align: center;
}
</style>
