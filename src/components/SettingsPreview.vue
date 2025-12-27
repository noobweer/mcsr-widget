<script setup>
import { computed } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()

const { nickname, badge, accent, state, rate, compact, live } = defineProps({
  nickname: String,
  badge: Number,
  accent: String,
  state: Number,
  rate: Number,
  compact: Boolean,
  live: Boolean,
})

const widgetUrl = computed(() => {
  const params = new URLSearchParams({
    nickname: nickname,
    badge: badge,
    accent: accent,
    state: state,
    rate: rate,
    advanced: compact ? 'true' : 'false',
    live: live ? 'true' : 'false',
  })

  return `/widget?${params.toString()}`
})

const copyDiscord = () => {
  navigator.clipboard.writeText('noobweer')
  toast.success('Discord username copied to clipboard')
}
</script>

<template>
  <div class="settings-preview">
    <div class="settings-preview-header">
      <span class="settings-preview-header__label">Preview</span>
      <span class="settings-preview-header__desc">Preview transition interval: 5 seconds</span>
      <!-- Links -->
      <div class="settings-preview-header-links">
        <a
          class="settings-preview-header-links__button"
          href="https://github.com/noobweer/mcsr-widget"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/github.svg" alt="" />
        </a>
        <div class="settings-preview-header-links__button" @click="copyDiscord">
          <img src="/icons/discord.svg" alt="" />
        </div>
      </div>
    </div>
    <iframe :src="widgetUrl" class="widget-preview" frameborder="0" />
  </div>
</template>

<style scoped>
.settings-preview {
  display: flex;
  padding: 8px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 16px;
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(/src/assets/icons/back.jpg) 50% / cover no-repeat;
}
.settings-preview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.settings-preview-header__label {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: #fff;
}
.settings-preview-header__desc {
  font-size: 14px;
  line-height: 28px;
  margin-left: 8px;
  color: #fff;
  opacity: 0.8;
}
.settings-preview-header-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.settings-preview-header-links__button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 12px;
  width: 32px;
  height: 32px;
  background: white;
}
.widget-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
