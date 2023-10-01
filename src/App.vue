<template>
  <div id="app">
    <el-config-provider :size="size">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElConfigProvider } from 'element-plus'

const size = ref<'default'>('default')
</script>

<style scoped></style>
