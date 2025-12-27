<script setup>
import InfoIcon from '@/assets/icons/info.svg'
import { ref } from 'vue'
import ModalPreview from './ModalPreview.vue'
import ToggleSwitch from './ToggleSwitch.vue'

const { modelValue } = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const update = (value) => {
  emit('update:modelValue', value)
}

const isModalOpen = ref(false)
</script>

<template>
  <div class="compact">
    <div class="compact-header">
      <div class="compact-header__label">Advanced Compact</div>
      <InfoIcon class="compact-header__button" @click="isModalOpen = true" />

      <!-- Modal Preview of Advanced Compact -->
      <ModalPreview v-model="isModalOpen">
        <div class="modal-header">
          <span class="modal__label">Advanced Compact</span>
          <span class="modal__close" @click="isModalOpen = false">Close</span>
        </div>
        <img src="/icons/preview/advanced.png" class="modal__pic" />
        <span class="modal__desc"
          >Enables extra stats in the compact overlay:<br />
          wins, losses, winrate, and rank
        </span>
      </ModalPreview>

      <ToggleSwitch :model-value="modelValue" @update:model-value="update" />
    </div>
    <div class="compact__desc">Adds win/loss, winrate & leaderboard rank</div>
  </div>
</template>

<style scoped>
.compact {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.compact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.compact-header__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.compact-header__button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.compact-header__button:hover {
  opacity: 80%;
}
.compact__desc {
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.modal__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.modal__close {
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 16px;
  color: #fff;
  background: #fa3532;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.modal__close:hover {
  opacity: 80%;
}
.modal__pic {
  width: 226px;
}
.modal__desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  text-align: center;
}
</style>
