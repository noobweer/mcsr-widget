<script setup>
import CurrentMatch from '@/components/CurrentMatch.vue'
import ExpandedOverlay from '@/components/ExpandedOverlay.vue'
import MinimizedOverlay from '@/components/MinimizedOverlay.vue'
import { preloadSplitIcons } from '@/lib/preloadSplitIcons'
import { useConfigStore } from '@/stores/config'
import { useStatsStore } from '@/stores/stats'
import { delay, motion, useAnimate } from 'motion-v'
import { onMounted, onUnmounted } from 'vue'

const configStore = useConfigStore()
const statsStore = useStatsStore()
const [scope, animate] = useAnimate()

const toggleOverlay = () => {
  configStore.isExpanded = !configStore.isExpanded

  if (configStore.isExpanded) {
    delay(() => animate(scope.current, variants.extendedExtra), configStore.rate / 2)
  }
}

const toggleExtra = () => {
  configStore.isExtra = !configStore.isExtra

  if (configStore.isExtra) {
    animate(scope.current, variants.extendedExtra)
  } else {
    animate(scope.current, variants.extended)
  }
}

const toggleIntervalID = setInterval(toggleOverlay, configStore.rate * 1000)

const variants = {
  hidden: {
    scale: 0.5,
    height: 0,
    width: 0,
    padding: '0.5rem 1rem',
  },
  visible: {
    scale: 1,
    height: configStore.advancedMinimized ? 64 : 48,
    width: 226,
    padding: '0.5rem 1rem',
  },
  extended: {
    scale: 1,
    height: 164,
    width: 290,
    padding: '1rem 1.5rem',
  },
  extendedExtra: {
    scale: 1,
    height: 196,
    width: 290,
    padding: '1rem 1.5rem',
  },
}

switch (configStore.state) {
  case 1:
    clearInterval(toggleIntervalID)
    configStore.isExpanded = true

    setInterval(() => toggleExtra(), configStore.rate * 1000)
    break
  case 2:
    clearInterval(toggleIntervalID)
    break
  case 3:
    configStore.isExpanded = true
    clearInterval(toggleIntervalID)
    break
  case 4:
    configStore.isExpanded = true
    clearInterval(toggleIntervalID)
    if (configStore.isExpanded) {
      delay(() => animate(scope.current, variants.extendedExtra), 0.1)
    }
    break
}

onUnmounted(() => {
  clearInterval(toggleIntervalID)
})
onMounted(async () => {
  await statsStore.userInfoUpdater(configStore.nickname)
  await statsStore.userMatchesUpdater(configStore.nickname)
  statsStore.startAutoUpdate(configStore.nickname, statsStore.uuid, configStore.liveMatch)

  if (configStore.liveMatch) {
    preloadSplitIcons()
  }
})
</script>

<template>
  <div class="container">
    <motion.div
      class="widget"
      ref="scope"
      :variants="variants"
      initial="hidden"
      :animate="configStore.isExpanded ? 'extended' : 'visible'"
    >
      <MinimizedOverlay key="minimized-overlay" v-if="!configStore.isExpanded" />

      <ExpandedOverlay key="expanded-overlay" v-else />
    </motion.div>
    <CurrentMatch />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.widget {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1rem;
  border-radius: 2rem;
  background: #000;
}
</style>
