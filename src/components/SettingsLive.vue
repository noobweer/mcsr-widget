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
  <div class="live">
    <div class="live-header">
      <div class="live-header__label">Live match tracker</div>
      <InfoIcon class="live-header__button" @click="isModalOpen = true" />

      <!-- Modal Preview of Live match tracker -->
      <ModalPreview v-model="isModalOpen">
        <div class="modal-header">
          <span class="modal__label">Live match tracker</span>
          <span class="modal__close" @click="isModalOpen = false">Close</span>
        </div>
        <img src="/icons/preview/tracker.png" class="modal__pic" />
        <span class="modal__desc">Displays real-time match statistics during active games</span>
        <span class="modal__desc"
          >IMPORTANT: Make sure your Twitch account is connected and set to public in MCSR Ranked
          settings</span
        >
      </ModalPreview>

      <ToggleSwitch :model-value="modelValue" @update:model-value="update" />
    </div>
    <div class="live__desc">Shows live match stats as they happen</div>
  </div>
</template>

<style scoped>
.live {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.live-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.live-header__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.live-header__button {
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}
.live-header__button:hover {
  opacity: 80%;
}
.live__desc {
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
