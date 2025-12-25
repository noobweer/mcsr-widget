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
  <div class="compact">
    <div class="compact-header">
      <div class="compact-header__label">Advanced Compact</div>
      <InfoIcon class="compact-header__button" />
      <ToggleSwitch :model-value="modelValue" @update:model-value="update" />
    </div>
    <div class="compact__desc">Adds win/loss, winrate & leaderboard rank</div>
  </div>
</template>

<style scoped>
.compact {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.compact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compact-header__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.compact-header__button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.compact-header__button:hover {
  opacity: 80%;
}
.compact__desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}
</style>
