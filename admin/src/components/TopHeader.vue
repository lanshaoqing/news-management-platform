<template>
  <el-header>
    <div class="left">
      <el-icon @click="handleCollapsed">
        <Menu />
      </el-icon>
      <span style="margin-left: 10px;">企业门户网站管理系统</span>
    </div>

    <div class="right">
      <span>欢迎 {{ store.state.userInfo.username }} 回来</span>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon :size="24" color="white">
            <User />
          </el-icon>
        </span>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Menu, User } from "@element-plus/icons-vue";

const store = useStore()
const handleCollapsed = () => {
  store.commit('changeCollapsed')
}
const router = useRouter()
const handleCenter = () => {
  router.push('/center')
}

const handleLogout = ()=>{
  localStorage.removeItem('token')
  store.commit('clearUserInfo')
  router.push('/login')
}

</script>

<style lang="scss" scoped>
.el-header {
  background-color: #2d3a4b;
  color: #fff;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .right {
    display: flex;
    align-items: center;

    i {
      cursor: pointer;
    }

    i:hover {
      color: #409eff;
    }
  }

  .right i {
    margin-left: 10px;
  }
}
</style>