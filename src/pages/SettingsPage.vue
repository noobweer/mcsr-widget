<script setup>
import CopyIcon from '@/assets/icons/copy.svg'
import SettingsAccent from '@/components/SettingsAccent.vue'
import SettingsBadge from '@/components/SettingsBadge.vue'
import SettingsCompact from '@/components/SettingsCompact.vue'
import SettingsInterval from '@/components/SettingsInterval.vue'
import SettingsLive from '@/components/SettingsLive.vue'
import SettingsMode from '@/components/SettingsMode.vue'
import SettingsNickname from '@/components/SettingsNickname.vue'
import SettingsPreview from '@/components/SettingsPreview.vue'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const nickname = ref('')
const badge = ref(1)
const accent = ref('FFFFFF')
const state = ref(0)
const rate = ref(30)
const compact = ref(false)
const live = ref(false)

const copyWidgetUrl = () => {
  const url = new URL(window.location.href)
  url.pathname = '/widget'
  url.searchParams.set('nickname', nickname.value)
  url.searchParams.set('badge', badge.value.toString())
  url.searchParams.set('accent', accent.value)
  url.searchParams.set('state', state.value.toString())
  url.searchParams.set('rate', rate.value.toString())
  url.searchParams.set('advanced', compact.value ? 'true' : 'false')
  url.searchParams.set('live', live.value ? 'true' : 'false')

  navigator.clipboard.writeText(url.toString())
  toast.success('Overlay URL copied to clipboard\nSet Browser Source size to 290 × 290 px')
}
</script>

<template>
  <div class="settings">
    <div class="settings-parametrs">
      <SettingsNickname v-model="nickname" />

      <SettingsMode v-model="state" />

      <SettingsInterval v-if="state < 2" v-model="rate" />

      <div class="settings-parametrs-container">
        <SettingsCompact v-model="compact" />
        <SettingsLive v-model="live" />
      </div>

      <SettingsBadge v-model="badge" />

      <SettingsAccent v-model="accent" />

      <div class="settings-container">
        <div class="settings-generate-wrapper">
          <div class="settings-generate" @click="copyWidgetUrl">
            <CopyIcon />
            <span class="settings-generate__text">Generate Overlay URL</span>
          </div>
        </div>
      </div>
    </div>
    <div class="settings-parametrs">
      <SettingsPreview
        :nickname="nickname"
        :badge="badge"
        :accent="accent"
        :state="state"
        :rate="5"
        :compact="compact"
        :live="live"
      />
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
  height: 100vh;
  gap: 0.625rem;
  padding: 1rem;
  background: black;
}
.settings-parametrs {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 0.625rem;
}
.settings-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.settings-generate-wrapper {
  margin-top: auto;
}
.settings-generate {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px 0;
  background: #37c058;
  box-shadow: inset 0px 4px 5px 0px rgba(168, 204, 167, 0.25);
  gap: 8px;
  border-radius: 16px;
  margin-top: 16px;
}
.settings-generate__text {
  color: white;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.5%;
  font-weight: 500;
}
.settings-parametrs-container {
  display: flex;
  gap: 32px;
  width: 100%;
}
</style>
