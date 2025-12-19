<script setup>
import CopyIcon from '@/assets/icons/copy.svg'
import SettingsBadge from '@/components/SettingsBadge.vue'
import SettingsNickname from '@/components/SettingsNickname.vue'
import StyleBadge from '@/components/StyleBadge.vue'
import { postWidgetCustomizations } from '@/lib/postWidgetCustomizations'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const nickname = ref(localStorage.getItem('nickname') || '')

const badges = [
  { id: 1, label: 'Ranked Icon', icon: 'ranked' },
  { id: 2, label: 'Winrate Circle', icon: 'winrate' },
  { id: 3, label: 'Player Head', icon: 'head' },
]
const selectedBadge = ref(Number(localStorage.getItem('selectedBadge')) || 1)

const accents = [
  { id: 'white', hex: 'FFFFFF' },
  { id: 'grey', hex: 'A4A4A9' },
  { id: 'yellow', hex: 'FDC633' },
  { id: 'red', hex: 'FA3532' },
  { id: 'green', hex: '37C058' },
  { id: 'blue', hex: '37A3DE' },
  { id: 'purple', hex: '504BCA' },
  { id: 'pink', hex: 'FF63BA' },
]
const selectedAccent = ref(localStorage.getItem('selectedAccent') || 'FFFFFF')

const styles = [
  { id: 0, label: 'All states', badge: 'anim', desc: 'Minimized, Latest match, Today stats' },
  { id: 1, label: '2 states', badge: 'anim', desc: 'Latest match, Today stats' },
  { id: 2, label: 'Minimized', badge: 'stat', desc: '' },
  { id: 3, label: 'Expanded - Latest match', badge: 'stat', desc: '' },
  { id: 4, label: 'Expanded - Today stats', badge: 'stat', desc: '' },
]

const selectedStyle = ref(Number(localStorage.getItem('selectedStyle')) || 0)

const rates = [
  { id: 1, value: 30 },
  { id: 2, value: 60 },
  { id: 3, value: 90 },
]
const selectedRate = ref(Number(localStorage.getItem('selectedRate')) || 30)

const copyWidgetUrl = () => {
  if (!nickname.value) {
    toast.error('Enter your Minecraft nickname')
    return
  }

  localStorage.setItem('nickname', nickname.value)
  localStorage.setItem('selectedBadge', selectedBadge.value)
  localStorage.setItem('selectedAccent', selectedAccent.value)
  localStorage.setItem('selectedRate', selectedRate.value)

  const widgetUrl = `${window.location.origin}/widget?nickname=${nickname.value}&badge=${selectedBadge.value}&rate=${selectedRate.value}&accent=${selectedAccent.value}&state=${selectedStyle.value}`
  navigator.clipboard.writeText(widgetUrl)

  toast.success('Overlay URL copied to clipboard!\nSet your browser source to 290×196 px.')

  postWidgetCustomizations({
    nickname: nickname.value,
    badge: selectedBadge.value,
    accent: selectedAccent.value,
    rate: selectedRate.value,
    state: selectedStyle.value,
  })
}

const exampleData = {
  nickname: nickname.value || 'Player',
  elo: 9999,
  rank: 'Netherite',
  rankIcon: 'netherite',
  badge: selectedBadge.value,
  accent: '#' + selectedAccent.value,
  winrate: 75,
  wins: 1,
  loses: 0,
  avg: '11:11',
  eloChange: +22,
  opponentNickname: 'Opponent',
  opponentElo: 1234,
  opponentResult: +22,
}

const openColorPicker = () => {
  colorInput.value.click()
}

const saveAccent = () => {
  selectedAccent.value = color.value.replace('#', '').toUpperCase()
}
const color = ref('#' + (localStorage.getItem('selectedAccent') || 'FFFFFF'))
const colorInput = ref(null)

const copyDiscord = () => {
  navigator.clipboard.writeText('noobweer')
  toast.success('Discord Username copied to clipboard!')
}
</script>

<template>
  <div class="settings">
    <div class="settings-parametrs">
      <SettingsNickname />

      <SettingsBadge />

      <!-- Accent color -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Accent color</span>
        <div class="settings-paramets-accents">
          <div
            class="palette"
            @click="openColorPicker"
            :class="{ active: !accents.some((a) => a.hex === selectedAccent) }"
          >
            <img src="/icons/palette.svg" alt="palette" />
          </div>
          <input
            type="color"
            ref="colorInput"
            v-model="color"
            @input="saveAccent"
            style="display: none"
          />
          <div
            v-for="accent in accents"
            :key="accent.hex"
            class="accent-item"
            :class="{ active: selectedAccent === accent.hex }"
            :style="{ backgroundColor: `#${accent.hex}` }"
            @click="selectedAccent = accent.hex"
          ></div>
        </div>
      </div>

      <!-- Widget style -->
      <div class="settings-parametrs-section">
        <span class="settings-parametrs-section__text">Widget style</span>
        <div class="settings-paramets-section-styles">
          <div class="settings-paramets-section-styles-states">
            <div
              class="style-item"
              @click="selectedStyle = styles[0].id"
              :class="{ active: selectedStyle === styles[0].id }"
            >
              <div class="style-item-info">
                <span class="style-item__title">{{ styles[0].label }}</span>
                <StyleBadge :type="styles[0].badge" />
              </div>
              <span class="style-item__desc">{{ styles[0].desc }}</span>
            </div>
            <div
              class="style-item"
              @click="selectedStyle = styles[1].id"
              :class="{ active: selectedStyle === styles[1].id }"
            >
              <div class="style-item-info">
                <span class="style-item__title">{{ styles[1].label }}</span>
                <StyleBadge :type="styles[1].badge" />
              </div>
              <span class="style-item__desc">{{ styles[1].desc }}</span>
            </div>
          </div>
          <div class="settings-paramets-section-styles-states">
            <!-- Minimized style -->
            <div
              class="style-item"
              @click="selectedStyle = styles[2].id"
              :class="{ active: selectedStyle === styles[2].id }"
            >
              <div class="style-item-info">
                <span class="style-item__title">{{ styles[2].label }}</span>
                <StyleBadge :type="styles[2].badge" />
              </div>
            </div>

            <!-- Latest match style -->
            <div
              class="style-item"
              @click="selectedStyle = styles[3].id"
              :class="{ active: selectedStyle === styles[3].id }"
            >
              <div class="style-item-info">
                <span class="style-item__title">{{ styles[3].label }}</span>
                <StyleBadge :type="styles[3].badge" />
              </div>
            </div>

            <!-- Today stats style -->
            <div
              class="style-item"
              @click="selectedStyle = styles[4].id"
              :class="{ active: selectedStyle === styles[4].id }"
            >
              <div class="style-item-info">
                <span class="style-item__title">{{ styles[4].label }}</span>
                <StyleBadge :type="styles[4].badge" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Animation rate -->
      <div class="settings-parametrs-section" v-if="selectedStyle === 0 || selectedStyle === 1">
        <div class="settings-parametrs-section-header">
          <span class="settings-parametrs-section__text">Animation rate</span>
          <span class="settings-parametrs-section__text-scnd">in seconds</span>
        </div>

        <div class="settings-parametrs-rates-container">
          <div class="settings-parametrs-rates-controls">
            <button class="rate-input-button-left" @click="selectedRate -= 5">
              <img src="/icons/minus.svg" alt="" />
            </button>
            <input class="rate-input" v-model="selectedRate" />
            <button class="rate-input-button-right" @click="selectedRate += 5">
              <img src="/icons/plus.svg" alt="" />
            </button>
          </div>

          <div class="settings-parametrs-rates">
            <div
              v-for="rate in rates"
              :key="rate.value"
              class="rate-item rate-item__text"
              @click="selectedRate = rate.value"
            >
              {{ rate.value }}
            </div>
          </div>
        </div>
      </div>

      <!-- Widget link -->
      <div class="settings-save">
        <div class="settings-save-button" @click="copyWidgetUrl">
          <CopyIcon class="settings-save-button_icon" />
          <span class="settings-save-button__text">Generate Widget URL</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings {
  display: flex;
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
.link-button {
  display: flex;
  width: 2rem;
  height: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.75rem;
  background: #fff;
  cursor: pointer;
}
.settings-parametrs-section {
  display: flex;
  min-width: 21.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
.settings-parametrs-section-header {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}
.settings-parametrs-section__text {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-parametrs-section__text-scnd {
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-parametrs-section-input {
  display: flex;
  padding: 0.5rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 0.25rem;
  border: 1.5px solid #353535;
  background: black;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
  letter-spacing: -0.00625rem;
}
.settings-parametrs-section-input:focus {
  outline: none;
  border-color: #fff;
}
.settings-parametrs-section-variants {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  align-self: stretch;
}
.variants-item {
  display: flex;
  width: 100%;
  padding: 0.5rem 0rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.25rem;
  background: #1b1b1b;
  cursor: pointer;
}
.variants-item:hover {
  background: #131313;
}
.variants-item.active {
  box-shadow: inset 0 0 0 2px grey;
}
.variants-item__icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 0.25rem;
}
.variants-item__label {
  color: #fff;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.settings-paramets-accents {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  gap: 0.5rem;
  align-self: stretch;
  flex-wrap: wrap;
}
.accent-item {
  width: 3rem;
  height: 3rem;
  border-radius: 0.25rem;
  cursor: pointer;
}
.palette {
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0.75rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  aspect-ratio: 1/1;
  border-radius: 0.25rem;
  cursor: pointer;
  background: #1b1b1b;
}
.palette:hover {
  background: #131313;
}
.palette.active {
  box-shadow: inset 0 0 0 2px grey;
}
.accent-item.active {
  box-shadow: inset 0 0 0 2px white;
}
.settings-parametrs-rates-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}
.settings-parametrs-rates {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.settings-parametrs-rates-controls {
  display: flex;
  align-items: center;
  gap: -0.125rem;
}
.rate-input {
  display: flex;
  width: 3.5rem;
  height: 3rem;
  padding: 0 1rem;
  text-align: center;
  border: 1.5px solid #353535;
  background: black;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
  letter-spacing: -0.00563rem;
}
.rate-input:focus {
  outline: none;
  border-color: #fff;
}
.rate-input-button-left {
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem 0 0 0.25rem;
  border: 1.5px solid #353535;
  border-right: none;
  background: black;
}
.rate-input-button-right {
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 0.25rem 0.25rem 0;
  border: 1.5px solid #353535;
  border-left: none;
  background: black;
}
.rate-item {
  display: flex;
  width: 3rem;
  height: 3rem;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  aspect-ratio: 1/1;
  border-radius: 0.25rem;
  background: #1b1b1b;
  cursor: pointer;
}
.rate-item:hover {
  background: #131313;
}
.rate-item.active {
  box-shadow: inset 0 0 0 2px white;
}
.rate-item__text {
  color: #fff;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.75rem;
  letter-spacing: -0.00563rem;
}
.settings-save {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-self: stretch;
}
.settings-save-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.25rem;
  background: #37c058;
  cursor: pointer;
}
.settings-save-button:hover {
  background: #3aab55;
}
.settings-save-button__text {
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25rem;
  letter-spacing: -0.00438rem;
}
.settings-save-button_icon {
  width: 1.5rem;
  height: 1.5rem;
}
.settings-paramets-section-styles {
  display: flex;
  width: 100%;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.settings-paramets-section-styles-states {
  display: flex;
  width: 100%;
  gap: 0.5rem;
}
.style-item {
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  border-radius: 0.25rem;
  background: #1b1b1b;
  cursor: pointer;
}
.style-item:hover {
  background: #131313;
}
.style-item.active {
  box-shadow: inset 0 0 0 2px grey;
}
.style-item-info {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
}
.style-item__title {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
}
.style-item__desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
}
</style>
