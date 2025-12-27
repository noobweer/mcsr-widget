<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const modalRef = ref(null)
let lastFocusedElement = null

const close = () => {
  emit('update:modelValue', false)
}

const onKeydown = (e) => {
  if (e.key === 'Escape') close()
}

const trapFocus = () => {
  const focusable = modalRef.value?.querySelectorAll(
    'a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])',
  )
  focusable?.[0]?.focus()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      lastFocusedElement = document.activeElement
      document.addEventListener('keydown', onKeydown)
      setTimeout(trapFocus)
    } else {
      document.removeEventListener('keydown', onKeydown)
      lastFocusedElement?.focus()
    }
  },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-root">
      <div class="modal-overlay" @click="closeOnOverlay && close()" />
      <div class="modal" ref="modalRef">
        <div class="modal-container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-root {
  position: fixed;
  inset: 0;
  z-index: 999;
}
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1b1b1b;
  border-radius: 16px;
  width: 400px;
  gap: 10px;
  padding: 8px 12px;
}
</style>
