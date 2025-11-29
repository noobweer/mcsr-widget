<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeFormatter'
import { motion } from 'motion-v'

const { nickname, avg, elo, leaderboard, split, diff } = defineProps({
  nickname: String,
  avg: String,
  elo: Number,
  leaderboard: Number,
  split: String,
  diff: Number,
})

const currentMatchVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    transition: {
      duration: 0.28,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.28,
    },
  },
}
</script>

<template>
  <motion.div
    class="match"
    :variants="currentMatchVariants"
    initial="hidden"
    animate="visible"
    exit="hidden"
  >
    <div class="match-header match__text">
      <span>Current match</span>
      <span
        style="font-weight: 500"
        :class="{
          'match__text--negative': diff > 0,
          'match__text--positive': diff < 0,
        }"
        >{{ eloChangeFormatter(diff) + Math.abs(diff) }}s</span
      >
    </div>

    <div class="match-opponent">
      <div class="match-opponent-stats">
        <div class="match-opponent" style="gap: 6px">
          <img :src="`https://mineskin.eu/helm/${nickname}/100.png`" class="match-opponent__icon" />
          <span class="match-opponent-stats__primary">{{ nickname }}</span>
        </div>
        <div class="match-opponent">
          <span class="match__text">{{ elo }} elo</span>
          <span class="match__text">{{ avg }} avg</span>
          <span class="match__text">#{{ leaderboard }}</span>
        </div>
      </div>
      <img :src="`/icons/splits/${split}.png`" class="match-opponent-split" />
    </div>
  </motion.div>
</template>

<style scoped>
.match {
  display: flex;
  flex-direction: column;
  width: 242px;
  gap: 8px;
  padding: 8px 12px 10px 12px;
  border-radius: 16px;
  background: #1b1b1b;
}
.match-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.match__text {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.match__text--positive {
  color: #37c058;
}
.match__text--negative {
  color: #fa3532;
}
.match-opponent {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}
.match-opponent-stats {
  display: flex;
  flex-direction: column;
  width: 176px;
  gap: 2px;
}
.match-opponent-stats__primary {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
  letter-spacing: -0.01488rem;
}
.match-opponent__icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}
.match-opponent-split {
  width: 34px;
  height: 34px;
  border-radius: 4px;
}
</style>
