<template>
  <el-container>
    <SideMenu></SideMenu>
    <el-container direction="vertical">
      <TopHeader></TopHeader>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import TopHeader from '@/components/TopHeader'
import SideMenu from '@/components/SideMenu'
</script>

<style lang="scss" scoped>
.el-main {
  overflow: auto;
  height: calc(100vh - 60px);
}
</style>