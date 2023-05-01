<template>
  <div>
    <el-tree
      ref="treeRef"
      :data="list"
      show-checkbox
      node-key="roleId"
      :default-checked-keys="authority"
      :check-strictly="true"
      :props="{
        children: 'roleList',
        label: 'name',
      }"
    />
    <el-button @click="changeAuthority">确认修改</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
import { InitData } from "@/type/authority";
import { getAuthorityList } from "@/request/api";

export default defineComponent({
  setup() {
    const route = useRoute();
    console.log(route);
    const query: any = route.query;
    const data = reactive(new InitData(query.id, query.authority));

    onMounted(() => {
      getAuthorityList().then((res) => {
        data.list = res.data;
      });
    });
    const changeAuthority = () => {
      console.log(data.treeRef);
      console.log(
        data.treeRef.getCheckedKeys().sort(function (a: number, b: number) {
          return a - b;
        })
      );
    };
    return { ...toRefs(data), changeAuthority };
  },
});
</script>

<style lang="scss" scoped>
</style>