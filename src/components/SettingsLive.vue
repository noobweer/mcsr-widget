<script setup>
import InfoIcon from '@/assets/icons/info.svg'
import ToggleSwitch from './ToggleSwitch.vue'

const { modelValue } = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const update = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="live">
    <div class="live-header">
      <div class="live-header__label">Live match tracker</div>
      <InfoIcon class="live-header__button" />
      <ToggleSwitch :model-value="modelValue" @update:model-value="update" />
    </div>
    <div class="live__desc">Shows live match stats as they happen</div>
  </div>
</template>

<style scoped>
.live {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.live-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.live-header__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.live-header__button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.live-header__button:hover {
  opacity: 80%;
}
.live__desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}
</style>
