<script setup>
import { useConfigStore } from '@/stores/config'
import { useStatsStore } from '@/stores/stats'
import { animate, delay, RowValue, useMotionValue, useTransform } from 'motion-v'
import { onUnmounted, watch } from 'vue'
import LatestMatch from './LatestMatch.vue'
import TodayStats from './TodayStats.vue'
import WinrateBadge from './WinrateBadge.vue'

const statsStore = useStatsStore()
const configStore = useConfigStore()

const toggleLatest = () => {
  configStore.isLatest = !configStore.isLatest
  delay(() => {
    configStore.isLatest = !configStore.isLatest
  }, configStore.rate)
}

const intervalID = setInterval(toggleLatest, (configStore.rate * 1000) / 2)

switch (configStore.state) {
  case 1:
    clearInterval(intervalID)
    setInterval(() => (configStore.isLatest = !configStore.isLatest), configStore.rate * 1000)
    break
  case 2:
    clearInterval(intervalID)
    break
  case 3:
    clearInterval(intervalID)
    break
  case 4:
    clearInterval(intervalID)
    configStore.isLatest = !configStore.isLatest
    break
}

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

onUnmounted(() => {
  clearInterval(intervalID)
})
</script>

<template>
  <div class="expanded">
    <div class="expanded-info">
      <div class="expanded-info-stats">
        <!-- Elo + leaderboard values -->
        <div class="expanded-info-stats-block">
          <span class="expanded-info-stats__text"><RowValue :value="eloRounded" /> elo</span>
          <div class="expanded-info-stats-leader expanded-info-stats__text">
            <span class="expanded-info-stats__hashtag">#</span>
            <span class="expanded-info-stats__text">
              <RowValue :value="leaderboardRounded" />
            </span>
          </div>
        </div>

        <div class="expanded-info-stats-rank">
          <span class="expanded-info-stats-rank__text">{{ statsStore.rank }}</span>
          <img
            :src="`/icons/ranks/${statsStore.rankIcon || 'coal'}.png`"
            alt="rank icon"
            class="expanded-info-stats-rank__icon"
          />
        </div>
      </div>

      <img
        v-if="badge === 1"
        src="/icons/ranked.png"
        alt="ranked icon"
        class="expanded-info__icon"
      />
      <WinrateBadge v-else-if="badge === 2" :percentage="winrate" :accent="accent" />
      <img
        v-else
        :src="`https://mineskin.eu/helm/${nickname}/100.png`"
        alt="player head"
        class="expanded-info__head"
      />
    </div>

    <LatestMatch
      v-if="!configStore.isLatest"
      :elo="opponentElo"
      :nickname="opponentNickname"
      :rank="opponentRank"
      :result="opponentResult"
    />
    <TodayStats v-else :accent="accent" :wins="wins" :loses="loses" :elo="eloChange" :avg="avg" />
  </div>
</template>

<style scoped>
.expanded {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.expanded-info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.expanded-info-stats {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
}
.expanded-info-stats-block {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.expanded-info-stats__text {
  color: #a4a4a9;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1rem;
  letter-spacing: -0.01488rem;
}
.expanded-info-stats-leader {
  display: flex;
  align-items: flex-end;
}
.expanded-info-stats__hashtag {
  color: #a4a4a9;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
  letter-spacing: -0.01488rem;
}
.expanded-info-stats-rank {
  display: flex;
  align-items: flex-start;
  gap: 0.25rem;
}
.expanded-info-stats-rank__text {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5rem;
  letter-spacing: -0.01488rem;
}
.expanded-info-stats-rank__icon {
  width: 1.5rem;
  height: 1.5rem;
}
.expanded-info__icon {
  width: 2rem;
  height: 2rem;
}
.expanded-info__head {
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
}
</style>
