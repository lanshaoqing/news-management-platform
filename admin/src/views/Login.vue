<template>
  <div>
    <vue-particles id="tsparticles" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded"
      :options="options" />
    <div class="formContainer">
      <h3>管理系统</h3>
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px"
        class="demo-ruleForm loginform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { loadFull } from "tsparticles";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { login } from '@/api/users'
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
const store = useStore()
const particlesInit = async (engine) => {
  await loadFull(engine);
};

const router = useRouter()
const loginForm = reactive({
  username: "admin",
  password: "123456",
});
const loginFormRef = ref();
const loginRules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" }
  ],
});

const submitForm = () => {
  // 校验
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      const result = await login(loginForm)
      store.commit('changeUserInfo', result.data.data)
      store.commit('changeGetterRouter', false)
      if (result.data.code === 1) {
        ElMessage.success(result.data.message)
        router.push('/index')
      } else {
        ElMessage.error(result.data.message)
      }

    };
  });
};

const options = {
  background: {
    color: {
      value: "#2d3a4b",
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 6,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};
</script>

<style lang="scss" scoped>
.formContainer {
  width: 500px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 20px;

  h3 {
    font-size: 30px;
  }

  .loginform {
    margin-top: 20px;
  }
}

::v-deep .el-form-item__label {
  color: white;
}
</style>