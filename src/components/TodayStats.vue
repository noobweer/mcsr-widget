<script setup>
import AvgIcon from '@/assets/icons/stats/avg.svg?component'
import EloIcon from '@/assets/icons/stats/elo.svg?component'
import LossesIcon from '@/assets/icons/stats/losses.svg?component'
import WinsIcon from '@/assets/icons/stats/wins.svg?component'
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
</script>

<template>
  <div class="today">
    <span class="today__text">Today session</span>
    <div class="today-stats">
      <div class="today-stats-values">
        <!-- Wins badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <WinsIcon :style="`color: ${configStore.accent}`" />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Wins</span>
            <span class="today-stats-values-badge__text">{{ statsStore.wins || 0 }}</span>
          </div>
        </div>

        <!-- Loses badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <LossesIcon :style="`color: ${configStore.accent}`" />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Losses</span>
            <span class="today-stats-values-badge__text">{{ statsStore.loses || 0 }}</span>
          </div>
        </div>
      </div>

      <div class="today-stats-values">
        <!-- Elo badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <EloIcon :style="`color: ${configStore.accent}`" />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Elo</span>
            <span class="today-stats-values-badge__text"
              >{{ eloChangeFormatter(statsStore.eloChange) }}<RowValue :value="changeRounded" />
            </span>
          </div>
        </div>

        <!-- Avg badge -->
        <div class="today-stats-values-badge">
          <div class="today-stats-values-badge-con">
            <AvgIcon :style="`color: ${configStore.accent}`" />
          </div>
          <div class="today-stats-values-badge-info">
            <span class="today__text">Avg</span>
            <span class="today-stats-values-badge__text">{{ statsStore.avg || '00:00' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.today {
  display: flex;
  align-self: stretch;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 1rem;
  background: #1b1b1b;
}
.today__text {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.today-stats {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.today-stats-values {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
  flex: 1 0 0;
}
.today-stats-values-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
.today-stats-values-badge-con {
  display: flex;
  width: 2rem;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
}
.today-stats-values-badge-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.125rem;
}
.today-stats-values-badge__text {
  color: #fff;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 0.875rem;
  letter-spacing: -0.015rem;
}
</style>
