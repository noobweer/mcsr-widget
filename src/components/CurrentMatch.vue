<script setup>
const { nickname, avg, elo, leaderboard, split, diff } = defineProps({
  nickname: String,
  avg: String,
  elo: Number,
  leaderboard: Number,
  split: String,
  diff: Number,
})
</script>

<template>
  <div class="match">
    <div class="match-header match__text">
      <span>Current match</span>
      <span
        :class="{
          'match__text--negative': diff > 0,
          'match__text--positive': diff < 0,
        }"
        >{{ diff }}s</span
      >
    </div>

    <div class="match-opponent">
      <div class="match-opponent-stats">
        <span class="match-opponent-stats__primary">{{ nickname }}</span>
        <div class="match-opponent">
          <span class="match__text">{{ elo }} elo</span>
          <span class="match__text">{{ avg }} avg</span>
          <span class="match__text">#{{ leaderboard }}</span>
        </div>
      </div>
      <img :src="`/icons/splits/${split}.png`" class="match-opponent-split" />
    </div>
  </div>
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
.match-opponent-split {
  width: 34px;
  height: 34px;
  border-radius: 4px;
}
</style>
