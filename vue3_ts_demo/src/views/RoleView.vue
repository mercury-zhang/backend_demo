<template>
  <div class="search-box">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="addRole">添加角色</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column prop="authority" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="changeRole(scope.row)"
          >
            修改权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getRoleList } from "../request/api";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { InitData, ListInt } from "@/type/role";
import { ElMessage, ElMessageBox } from "element-plus";
export default defineComponent({
  setup() {
    const data = reactive(new InitData());
    onMounted(() => {
      getRoleList().then((res) => {
        data.list = res.data;
      });
    });

    const changeRole = (row: ListInt) => {
      console.log(row);
    };

    const addRole = () => {
      ElMessageBox.prompt("请输入角色名称", "添加", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          if (value) {
            data.list.push({
              roleId: data.list.length + 1,
              roleName: value,
              authority: [],
            });
          }
          ElMessage({
            type: "success",
            message: `${value}角色添加成功`,
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消操作",
          });
        });
    };

    return { ...toRefs(data), changeRole, addRole };
  },
});
</script>

<style lang="scss" scoped>
</style>