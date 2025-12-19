<script setup>
import { ref } from 'vue'

const badges = [
  { id: 1, label: 'Ranked Icon', icon: 'ranked' },
  { id: 2, label: 'Winrate Circle', icon: 'winrate' },
  { id: 3, label: 'Player Head', icon: 'head' },
]
const selectedBadge = ref(Number(localStorage.getItem('selectedBadge')) || 1)
</script>

<template>
  <div class="badge">
    <span class="badge__label">Corner badge</span>
    <div class="badge-selector">
      <div
        v-for="badge in badges"
        :key="badge.id"
        class="badge-selector__item"
        :class="{ 'badge-selector__item--active': selectedBadge === badge.id }"
        @click="selectedBadge = badge.id"
      >
        <img :src="`/icons/${badge.icon}.png`" class="badge-selector__icon" />
        <span class="badge-selector__label">{{ badge.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.badge {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.badge__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.badge-selector {
  display: flex;
  gap: 8px;
}
.badge-selector__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 100%;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  background: #1b1b1b;
  transition: opacity 0.2s ease;
}
.badge-selector__item:hover {
  opacity: 80%;
}
.badge-selector__item--active {
  box-shadow: inset 0 0 0 1.5px white;
}
.badge-selector__icon {
  width: 48px;
  height: 48px;
  border-radius: 4px;
}
.badge-selector__label {
  color: white;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}
</style>
