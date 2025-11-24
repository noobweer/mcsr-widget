<script setup>
import { eloChangeFormatter } from '@/lib/eloChangeForametter'
import { animate, RowValue, useMotionValue, useTransform } from 'motion-v'
import { watch } from 'vue'

const { elo, eloRank, rankIcon, eloChange, leaderboard, wins, loses, winrate } = defineProps({
  elo: Number,
  eloRank: Number,
  rankIcon: String,
  eloChange: Number,
  leaderboard: Boolean,
  wins: Number,
  loses: Number,
  winrate: Number,
})

const changeCounter = useMotionValue(Math.abs(eloChange))
const changeRounded = useTransform(() => Math.round(changeCounter.get()))

watch(
  () => eloChange,
  (newEloChange) => {
    animate(changeCounter, Math.abs(newEloChange), {
      duration: 0.5,
    })
  },
)

const eloCounter = useMotionValue(elo)
const eloRounded = useTransform(() => Math.round(eloCounter.get()))

watch(
  () => elo,
  (newElo) => {
    animate(eloCounter, newElo, {
      duration: 0.5,
    })
  },
)

const leaderboardCounter = useMotionValue(eloRank)
const leaderboardRounded = useTransform(() => Math.round(leaderboardCounter.get()))

watch(
  () => eloRank,
  (newRank) => {
    animate(leaderboardCounter, newRank, {
      duration: 0.5,
    })
  },
)
</script>

<template>
  <div class="minimized" :style="leaderboard ? 'padding: 0 6px 0 6px' : ''">
    <div class="miminized-info">
      <div class="miminized-info-rank">
        <img
          :src="`/icons/${rankIcon || 'coal'}.png`"
          alt="rank icon"
          :class="
            leaderboard ? 'miminized-info-rank__icon_small' : 'miminized-info-rank__icon_large'
          "
        />
        <span class="miminized-info-rank__text"><RowValue :value="eloRounded" /> elo</span>
      </div>
      <span
        class="miminized-info__text"
        :class="{
          'miminized-info__text--positive': eloChange > 0,
          'miminized-info__text--negative': eloChange < 0,
        }"
        >{{ eloChangeFormatter(eloChange) }}<RowValue :value="changeRounded"
      /></span>
    </div>
    <div v-if="leaderboard" class="stats stats__text">
      <div class="stats-matches">
        <span>{{ wins }}W</span>
        <span>{{ loses }}L</span>
      </div>
      <span>{{ winrate }}%</span>
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
