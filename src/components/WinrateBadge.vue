<script setup>
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const { percentage, accent } = defineProps({
  percentage: Number,
  accent: String,
})

const percentageCounter = useMotionValue(percentage)
const rounded = useTransform(() => Math.round(percentageCounter.get()))

watch(
  () => percentage,
  (newPercentage) => {
    animate(percentageCounter, Math.abs(newPercentage), {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="winrate">
    <span class="winrate__text" :style="`color: ${accent}`">Winrate</span>
    <div class="winrate-circle">
      <span class="winrate_percentage" :style="`color: ${accent}`"
        ><RowValue :value="rounded"
      /></span>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        class="circular-progress"
        :style="`--progress: ${percentage}`"
      >
        <circle class="bg" :style="`stroke: ${accent}`"></circle>
        <circle class="fg" :style="`stroke: ${accent}`"></circle>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.winrate {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}
.winrate__text {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 0.75rem;
  letter-spacing: -0.01488rem;
}
.winrate-circle {
  display: flex;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
}
.circular-progress {
  --size: 26px;
  --half-size: calc(var(--size) / 2);
  --stroke-width: 2.5px;
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((var(--progress) * var(--circumference)) / 100);
}
.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}
.circular-progress circle.bg {
  opacity: 0.4;
}
.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
}
.winrate_percentage {
  position: absolute;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 0.48531rem;
  letter-spacing: -0.0625rem;
}
</style>
