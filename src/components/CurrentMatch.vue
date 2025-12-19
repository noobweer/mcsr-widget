<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeFormatter'
import { useStatsStore } from '@/stores/stats'
import { AnimatePresence, motion } from 'motion-v'

const statsStore = useStatsStore()

const currentMatchVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="statsStore.isLiveMatch"
      key="live-match"
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
            'match__text--negative': statsStore.liveMatchDiff > 0,
            'match__text--positive': statsStore.liveMatchDiff < 0,
          }"
        >
          {{ eloChangeFormatter(statsStore.liveMatchDiff) + Math.abs(statsStore.liveMatchDiff) }}s
        </span>
      </div>

      <div class="match-opponent">
        <div class="match-opponent-stats">
          <div class="match-opponent" style="gap: 6px">
            <img
              :src="`https://mineskin.eu/helm/${statsStore.liveMatchNickname}/100.png`"
              class="match-opponent__icon"
            />
            <span class="match-opponent-stats__primary">{{ statsStore.liveMatchNickname }}</span>
          </div>
          <div class="match-opponent">
            <span class="match__text">{{ statsStore.liveMatchElo }} elo</span>
            <span class="match__text">#{{ statsStore.liveMatchRank }}</span>
            <span class="match__text">{{ statsStore.liveMatchAvg }} avg</span>
          </div>
        </div>
        <img :src="`/icons/splits/${statsStore.liveMatchSplit}.png`" class="match-opponent-split" />
      </div>
    </motion.div>
  </AnimatePresence>
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
  gap: 10px;
}
.match-opponent-stats {
  display: flex;
  flex-direction: column;
  width: 176px;
  gap: 4px;
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
