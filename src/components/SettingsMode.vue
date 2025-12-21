<script setup>
import StyleBadge from './StyleBadge.vue'

const { modelValue } = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const animatedModes = [
  { id: 0, label: 'Complete', desc: 'Compact, Last match, Today session', badge: 'anim' },
  { id: 1, label: 'Match & Today session', desc: 'Last match, Today session', badge: 'anim' },
]

const staticModes = [
  { id: 2, label: 'Compact', badge: 'stat' },
  { id: 3, label: 'Last match', badge: 'stat' },
  { id: 4, label: 'Today session', badge: 'stat' },
]

const selectMode = (id) => {
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="mode">
    <span class="mode__label">Overlay mode</span>

    <div class="mode-selector">
      <!-- animated — first row -->
      <div class="mode-selector__row">
        <div
          v-for="animatedMode in animatedModes"
          :key="animatedMode.id"
          class="mode-selector__item"
          :class="{ 'mode-selector__item--active': modelValue === animatedMode.id }"
          @click="selectMode(animatedMode.id)"
        >
          <div class="mode-selector__item__label">
            {{ animatedMode.label }}
            <StyleBadge :type="animatedMode.badge" />
          </div>
          <span class="mode-selector__item__desc">
            {{ animatedMode.desc }}
          </span>
        </div>
      </div>

      <!-- static — second row -->
      <div class="mode-selector__row mode-selector__row--static">
        <div
          v-for="staticMode in staticModes"
          :key="staticMode.id"
          class="mode-selector-static__item mode-selector__item__label"
          :class="{ 'mode-selector-static__item--active': modelValue === staticMode.id }"
          @click="selectMode(staticMode.id)"
        >
          {{ staticMode.label }}
          <StyleBadge :type="staticMode.badge" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mode {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.mode__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.mode-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.mode-selector__row {
  display: flex;
  gap: 8px;
  width: 100%;
}
.mode-selector__item {
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: #1b1b1b;
  flex: 1;
  min-width: 274px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}
.mode-selector__item:hover {
  opacity: 80%;
}
.mode-selector__item--active {
  box-shadow: inset 0 0 0 1.5px white;
}
.mode-selector__item__label {
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
.mode-selector__item__desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
}
.mode-selector-static {
  display: flex;
  width: 100%;
  min-width: 600px;
  gap: 8px;
}
.mode-selector__row--static .mode-selector-static__item {
  flex: 1;
}
.mode-selector-static__item {
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  padding: 8px 12px;
  background: #1b1b1b;
  border-radius: 8px;
  transition: opacity 0.2s ease;
}
.mode-selector-static__item--active {
  box-shadow: inset 0 0 0 1.5px white;
}
.mode-selector-static__item:hover {
  opacity: 80%;
}
</style>
