<script setup>
import CopyIcon from '@/assets/icons/copy.svg'
import SettingsAccent from '@/components/SettingsAccent.vue'
import SettingsBadge from '@/components/SettingsBadge.vue'
import SettingsInterval from '@/components/SettingsInterval.vue'
import SettingsMode from '@/components/SettingsMode.vue'
import SettingsNickname from '@/components/SettingsNickname.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { ref } from 'vue'

// const toast = useToast()
const advencedSettings = ref(false)
const nickname = ref('')
const badge = ref(1)
const accent = ref('FFFFFF')
const mode = ref(0)
const interval = ref(30)
</script>

<template>
  <div class="settings">
    <div class="settings-parametrs">
      <SettingsNickname />

      <SettingsBadge v-model="badge" />

      <SettingsAccent v-model="accent" />

      <SettingsMode v-model="mode" />

      <SettingsInterval v-model="interval" />

      <ToggleSwitch v-model="advencedSettings" />

      <div class="settings-generate" @click="copyWidgetUrl">
        <CopyIcon class="settings-generate__icon" />
        <span class="settings-generate__text">Generate Overlay URL</span>
      </div>
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
}
.settings-generate__text {
  color: white;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: -0.5%;
  font-weight: 500;
}
</style>
