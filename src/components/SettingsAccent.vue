<script setup>
import { ref, watch } from 'vue'

const STORAGE_KEY = 'selectedAccent'

const accents = [
  { id: 'white', hex: 'FFFFFF' },
  { id: 'grey', hex: 'A4A4A9' },
  { id: 'yellow', hex: 'FDC633' },
  { id: 'red', hex: 'FA3532' },
  { id: 'green', hex: '37C058' },
  { id: 'blue', hex: '37A3DE' },
  { id: 'purple', hex: '504BCA' },
  { id: 'pink', hex: 'FF63BA' },
]

// начальное значение
const selectedAccent = ref(localStorage.getItem(STORAGE_KEY) ?? 'FFFFFF')

const color = ref(`#${selectedAccent.value}`)
const colorInput = ref(null)

const openColorPicker = () => {
  colorInput.value?.click()
}

const saveAccent = () => {
  selectedAccent.value = color.value.slice(1).toUpperCase()
}

watch(selectedAccent, (value) => {
  localStorage.setItem(STORAGE_KEY, value)
  color.value = `#${value}`
})
</script>

<template>
  <div class="accent">
    <span class="accent__label">Accent color</span>
    <div class="accent-selector">
      <div
        class="accent-selector__palette"
        @click="openColorPicker"
        :class="{ active: !accents.some((a) => a.hex === selectedAccent) }"
      >
        <img src="/icons/palette.svg" />
      </div>
      <input
        type="color"
        ref="colorInput"
        v-model="color"
        @input="saveAccent"
        style="display: none"
      />
      <div
        v-for="accent in accents"
        :key="accent.hex"
        class="accent-selector__item"
        :class="{ 'accent-selector__item--active': selectedAccent === accent.hex }"
        :style="{ backgroundColor: `#${accent.hex}` }"
        @click="selectedAccent = accent.hex"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.accent {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.accent__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.accent-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
}
.accent-selector__palette {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: #242424;
  transition: opacity 0.2s ease;
}
.accent-selector__palette:hover {
  opacity: 80%;
}
.accent-selector__item {
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}
.accent-selector__item:hover {
  opacity: 80%;
}
.accent-selector__item--active {
  box-shadow: inset 0 0 0 1.5px white;
}
</style>
