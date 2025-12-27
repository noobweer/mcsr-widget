<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    default: 5,
  },
  max: {
    type: Number,
    default: 300,
  },
  step: {
    type: Number,
    default: 5,
  },
})

const emit = defineEmits(['update:modelValue'])

const rates = [30, 60, 90]

const normalize = (value) => {
  let v = Number(value)

  if (Number.isNaN(v)) return props.modelValue
  if (v < props.min) v = props.min
  if (v > props.max) v = props.max

  return Math.round(v / props.step) * props.step
}

const setValue = (value) => {
  emit('update:modelValue', normalize(value))
}

const increase = () => setValue(props.modelValue + props.step)
const decrease = () => setValue(props.modelValue - props.step)
</script>

<template>
  <div class="interval">
    <div class="interval__label">
      <span style="color: #ffffff">transition interval</span>
      <span style="color: rgba(255, 255, 255, 0.4)">in seconds</span>
    </div>

    <div class="interval-selector">
      <div class="interval-selector-controls">
        <button
          class="interval-selector-controls__button"
          style="border-radius: 8px 0 0 8px"
          @click="decrease"
        >
          <img src="/icons/minus.svg" alt="" />
        </button>

        <input
          class="interval-selector-controls__input"
          :value="modelValue"
          @input="setValue($event.target.value)"
        />

        <button
          class="interval-selector-controls__button"
          style="border-radius: 0 8px 8px 0"
          @click="increase"
        >
          <img src="/icons/plus.svg" alt="" />
        </button>
      </div>

      <div class="interval-selector-items">
        <div
          v-for="rate in rates"
          :key="rate"
          class="interval-selector-items__item"
          @click="setValue(rate)"
        >
          {{ rate }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interval {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.interval__label {
  display: flex;
  gap: 8px;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.interval-selector {
  display: flex;
  width: 100%;
  gap: 16px;
}
.interval-selector-controls {
  display: flex;
  gap: -2.5px;
}
.interval-selector-controls__button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  background: #1b1b1b;
  width: 48px;
  height: 48px;
  padding: 16px;
  transition: opacity 0.2s ease;
}
.interval-selector-controls__button:hover {
  opacity: 80%;
}
.interval-selector-controls__input {
  background: #1b1b1b;
  width: 60px;
  height: 48px;
  padding: 12px;
  border: none;
  border-radius: 0;
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 500;
  text-align: center;
}
.interval-selector-items {
  display: flex;
  width: 100%;
  gap: 8px;
}
.interval-selector-items__item {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  height: 48px;
  background: #1b1b1b;
  border-radius: 8px;
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 500;
  transition: opacity 0.2s ease;
}
.interval-selector-items__item:hover {
  opacity: 80%;
}
</style>
