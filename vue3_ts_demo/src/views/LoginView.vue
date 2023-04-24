<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理系统</h2>
      <el-form-item label="账号：" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item class="loginBtn">
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button class="loginBtn">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, defineComponent } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";

export default {
  setup() {
    const data = reactive(new LoginData());
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 3, max: 5, message: "用户名长度为3-5个字符", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 12,
          message: "用户名长度为6-12个字符",
          trigger: "blur",
        },
      ],
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate((valid) => {
        if (valid) {
          login(data.ruleForm).then((res) => {
            localStorage.setItem("token", res.data.token);
            router.push("/");
          });
        } else {
          console.log("error submit!");
          return false;
        }
      });
    };

    return {
      ...toRefs(data),
      rules,
      ruleFormRef,
      submitForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/bg.png");
  background-size: cover;
  padding: 1px;
  text-align: center;
  .demo-ruleForm {
    width: 500px;
    margin: 200px auto;
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
  }
  .loginBtn {
    width: 48%;
  }
  h2 {
    margin-bottom: 10px;
  }
}
</style>