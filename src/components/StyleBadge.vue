<script setup>
const { type } = defineProps({
  type: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="badge" v-if="type === 'anim'" style="background: #fa3532">Animated</div>

  <div class="badge" v-else style="background: #37a3de">Static</div>
</template>

<style scoped>
.badge {
  display: flex;
  padding: 0 0.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
}
</style>
