<script setup>
const { type } = defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div
    class="badge badge__label"
    :style="type === 'anim' ? 'background: #fa3532' : 'background: #37A3DE'"
  >
    {{ type === 'anim' ? 'Animated' : 'Static' }}
  </div>
</template>

<style scoped>
.badge {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-radius: 8px;
}
.badge__label {
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}
</style>
