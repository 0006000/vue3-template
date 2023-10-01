<template>
  <section class="page">
    {{ $t('login.title') }}
    <el-button type="primary" @click="showMessage">按钮</el-button>
    <el-button type="primary" @click="showLoading">加载</el-button>
    <el-row>
      <el-col>{{ person.name }}</el-col>
    </el-row>
    {{ count }}
  </section>
</template>

<script setup lang="ts">
import { ElLoading, ElMessage, ElNotification } from 'element-plus'

const showMessage = () => {
  ElMessage.success('成功了')
  ElNotification({
    title: 'Warning',
    message: 'This is a warning message',
    type: 'warning',
  })
}
const showLoading = () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.3)',
  })
  setTimeout(() => {
    loading.close()
  }, 2000)
}

const count = ref(0)
const person = reactive({ name: 'lilei' })
</script>

<style scoped lang="scss">
.page {
  color: var(--main-color);
}
</style>
