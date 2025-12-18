<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeFormatter'
import { useConfigStore } from '@/stores/config'
import { useStatsStore } from '@/stores/stats'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const statsStore = useStatsStore()
const configStore = useConfigStore()

const changeCounter = useMotionValue(Math.abs(statsStore.eloChange))
const changeRounded = useTransform(() => Math.round(changeCounter.get()))

watch(
  () => statsStore.eloChange,
  (newEloChange) => {
    animate(changeCounter, Math.abs(newEloChange), {
      duration: 0.5,
    })
  },
)

const eloCounter = useMotionValue(statsStore.elo)
const eloRounded = useTransform(() => Math.round(eloCounter.get()))

watch(
  () => statsStore.elo,
  (newElo) => {
    animate(eloCounter, newElo, {
      duration: 0.5,
    })
  },
)

const leaderboardCounter = useMotionValue(statsStore.eloRank)
const leaderboardRounded = useTransform(() => Math.round(leaderboardCounter.get()))

watch(
  () => statsStore.eloRank,
  (newRank) => {
    animate(leaderboardCounter, newRank, {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="minimized">
    <div class="miminized-info">
      <div class="miminized-info-rank">
        <img
          :src="`/icons/ranks/${statsStore.rankIcon || 'coal'}.png`"
          alt="rank icon"
          :class="
            configStore.advancedMinimized
              ? 'miminized-info-rank__icon_small'
              : 'miminized-info-rank__icon_large'
          "
        />
        <span class="miminized-info-rank__text"><RowValue :value="eloRounded" /> elo</span>
      </div>
      <span
        class="miminized-info__text"
        :class="{
          'miminized-info__text--positive': statsStore.eloChange > 0,
          'miminized-info__text--negative': statsStore.eloChange < 0,
        }"
        >{{ eloChangeFormatter(statsStore.eloChange) }}<RowValue :value="changeRounded"
      /></span>
    </div>
    <div v-if="configStore.advancedMinimized" class="stats stats__text">
      <div class="stats-matches">
        <span>{{ statsStore.wins }}W</span>
        <span>{{ statsStore.loses }}L</span>
      </div>
      <span>{{ statsStore.winrate }}%</span>
      <span>#<RowValue :value="leaderboardRounded" /></span>
    </div>
  </div>
</template>

<style scoped>
.minimized {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.miminized-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-grow: 1;
  align-items: center;
}
.miminized-info-rank {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}
.miminized-info-rank__icon_large {
  width: 2rem;
  height: 2rem;
  image-rendering: pixelated;
}
.miminized-info-rank__icon_small {
  width: 24px;
  height: 24px;
  image-rendering: pixelated;
}
.miminized-info-rank__text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.miminized-info__text {
  color: #a4a4a9;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}

.miminized-info__text--positive {
  color: #37c058;
}
.miminized-info__text--negative {
  color: #fa3532;
}

.stats {
  display: flex;
  width: 100%;
  color: white;
  justify-content: space-between;
  padding: 0 6px;
}
.stats-matches {
  display: flex;
  gap: 8px;
}
.stats__text {
  color: #a4a4a9;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.01488rem;
}
</style>
