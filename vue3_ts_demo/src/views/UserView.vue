<template>
  <div class="search-box">
    <el-form :inline="true" :model="selectData" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="selectData.nickName" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select
          v-model="selectData.role"
          class="m-2"
          placeholder="请选择角色"
          size="large"
        >
          <el-option label="全部" :value="0"></el-option>
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="nickName" label="姓名" width="180" />
      <el-table-column prop="role" label="角色">
        <template #default="scope">
          <el-button
            v-for="item in scope.row.role"
            link
            type="primary"
            size="small"
            :key="item.role"
          >
            {{ item.roleName }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getUserList, getRoleList } from "@/request/api";
import { InitData } from "@/type/user";
import { defineComponent, onMounted, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    onMounted(() => {
      getUser();
      getRole();
    });

    const data = reactive(new InitData());

    const getUser = () => {
      getUserList().then((res) => {
        console.log(res);
        data.list = res.data;
      });
    };
    const getRole = () => {
      getRoleList().then((res) => {
        console.log(res);
        data.roleList = res.data;
      });
    };

    return {
      ...toRefs(data),
    };
  },
});
</script>

<style lang="scss" scoped>
</style>