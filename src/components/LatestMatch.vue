<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const { elo, nickname, rank, result } = defineProps({
  elo: Number,
  nickname: String,
  rank: Number,
  result: Number,
})

const resultCounter = useMotionValue(Math.abs(result))
const rounded = useTransform(() => Math.round(resultCounter.get()))

watch(
  () => result,
  (newResult) => {
    animate(resultCounter, Math.abs(newResult), {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="latest">
    <span class="latest__text">Latest</span>
    <div class="latest-match">
      <div class="latest-match-opponent">
        <img
          :src="`https://mineskin.eu/helm/${nickname}/100.png`"
          alt=""
          class="latest-match-opponent__icon"
        />
        <div class="latest-match-opponent-info">
          <div class="latest-match-opponent-info-stats">
            <span class="latest__text">{{ elo }} elo</span>
            <span class="latest__text">#{{ rank }}</span>
          </div>
          <span class="latest-match-opponent-info__nickname">{{ nickname }}</span>
        </div>
      </div>
      <span
        class="latest-match-opponent__result"
        :class="{
          'latest-match-opponent__result--positive': result > 0,
          'latest-match-opponent__result--negative': result < 0,
        }"
        >{{ eloChangeFormatter(result) }}<RowValue :value="rounded"
      /></span>
    </div>
  </div>
</template>

<style scoped>
.latest {
  display: flex;
  align-self: stretch;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  border-radius: 1rem;
  background: #1b1b1b;
}
.latest__text {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.latest-match {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}
.latest-match-opponent {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.latest-match-opponent__icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
}
.latest-match-opponent-info {
  display: flex;
  width: 150px;
  gap: 2px;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}
.latest-match-opponent-info-stats {
  display: flex;
  gap: 0.5rem;
}
.latest-match-opponent-info__nickname {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  letter-spacing: -0.01488rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.latest-match-opponent__result {
  color: #a4a4a9;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 0.65538rem;
  letter-spacing: -0.01488rem;
}
.latest-match-opponent__result--positive {
  color: #37c058;
}
.latest-match-opponent__result--negative {
  color: #fa3532;
}
</style>
