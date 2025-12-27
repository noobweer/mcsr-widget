import { preloadImage } from '@/lib/preloadImage'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useConfigStore = defineStore('config', () => {
  const route = useRoute()

  const nickname = route.query.nickname
  const badge = Number(route.query.badge)

  // FIXME: Preload must be moved to better place and optimized based on selected badge
  preloadImage('/icons/ranked.png')
  preloadImage(`https://mineskin.eu/helm/${nickname}/100.png`)

  const rate = Number(route.query.rate)
  const accent = '#' + route.query.accent
  const state = Number(route.query.state)
  const advancedMinimized = route.query.advanced === 'true'
  const liveMatch = route.query.live === 'true'

  const isExpanded = ref(false)
  const isExtra = ref(false)
  const isLatest = ref(false)

  return {
    nickname,
    badge,
    rate,
    accent,
    state,
    advancedMinimized,
    liveMatch,
    isExpanded,
    isExtra,
    isLatest,
  }
})
