<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ name: 'SvgIcon' })
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
const symbolId = computed(() => `#${name}`)
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.1em;
  overflow: hidden;
}
</style>
