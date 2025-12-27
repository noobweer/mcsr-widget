<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}

const classes = computed(() => ({
  'toggle--active': props.modelValue,
  'toggle--disabled': props.disabled,
}))
</script>

<template>
  <div class="toggle" :class="classes" @click="toggle">
    <div class="toggle__thumb"></div>
  </div>
</template>

<style scoped>
.toggle {
  width: 52px;
  height: 32px;
  padding: 5px 4px;
  background: #1b1b1b;
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle__thumb {
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 4px;
  left: 5px;
  transition: transform 0.2s ease;
}

/* active */
.toggle--active {
  background: #37c058;
}

.toggle--active .toggle__thumb {
  transform: translateX(20px);
}

/* disabled */
.toggle--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
