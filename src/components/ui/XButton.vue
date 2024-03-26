<script setup>
import { computed } from 'vue'

defineEmits(['click'])
const { variant, size, disabled, to, type, center, fullWidth } = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'warning'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  to: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'button'
  },
  center: {
    type: Boolean,
    default: true
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

const defaultClasses =
  'inline-flex items-center justify-center rounded-full transition-colors duration-300 text-white font-bold'

const variantClasses = {
  primary: 'bg-primary-500 hover:bg-primary-600',
  secondary: 'bg-secondary-500 hover:bg-secondary-600',
  danger: 'bg-red-500 hover:bg-red-600',
  warning: 'bg-yellow-500 hover:bg-yellow-600',
  theme: 'bg-theme-500 hover:bg-theme-400',
  gray: 'bg-gray-500 hover:bg-gray-400',
  orange: 'bg-theme-400 hover:bg-orange-600',
  green: 'bg-green-500 hover:bg-green-400'
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs md:text-sm',
  md: 'px-4 py-2 text-sm md:text-base',
  lg: 'px-6 py-3 text-lg md:text-xl'
}

const disabledClasses = {
  primary: 'bg-primary-300 cursor-not-allowed',
  secondary: 'bg-secondary-300 cursor-not-allowed',
  danger: 'bg-red-300 cursor-not-allowed',
  warning: 'bg-yellow-300 cursor-not-allowed'
}

const fullClass = computed(
  () =>
    `${defaultClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses[variant] : ''} ${
      center ? 'text-center' : ''
    } ${fullWidth ? 'w-full' : ''}`
)
</script>

<template>
  <router-link v-if="to" :to="to" :class="fullClass" :disabled="disabled" @click="$emit('click')">
    <slot />
  </router-link>
  <button v-else :type="type" :class="fullClass" :disabled="disabled" @click="$emit('click')">
    <slot />
  </button>
</template>
