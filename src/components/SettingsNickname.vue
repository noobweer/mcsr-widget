<script setup>
const { modelValue } = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const update = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="nickname-input">
    <span class="nickname-input__label">Minecraft nickname</span>
    <input
      type="text"
      :value="modelValue"
      @input="update"
      placeholder="Enter your Minecraft nickname"
      class="nickname-input__field"
    />
  </div>
</template>

<style scoped>
.nickname-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
}
.nickname-input__label {
  color: white;
  font-size: 20px;
  line-height: 28px;
  letter-spacing: -0.5%;
  font-weight: 600;
}
.nickname-input__field {
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1.5px solid #353535;
  background: #1b1b1b;
  color: white;
  font-size: 20px;
  line-height: 28px;
  font-weight: 500;
  letter-spacing: -0.00625rem;
}
.nickname-input__field:focus {
  outline: none;
  border-color: #fff;
}
</style>
