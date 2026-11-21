<script setup lang="ts">
import { onMounted, ref } from "vue";

defineProps<{
  disabled?: boolean;
}>();

const model = defineModel<boolean>();

const ready = ref(false);
onMounted(() => requestAnimationFrame(() => ready.value = true));
</script>

<template>
  <label class="toggle" :class="{ ready }" @dragstart.prevent>
    <input v-model="model" type="checkbox" :disabled>
    <span class="knob"/>
  </label>
</template>

<style scoped>
.toggle {
  height: 1.75rem;
  width: 4rem;
  display: flex;
  background-color: var(--color-control);
  border-radius: var(--border-radius-round);
  padding: 0.125rem;
  cursor: pointer;

  &:has(input:focus-visible) {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }

  &.ready {
    transition: background-color 200ms;
    .knob { transition: width 200ms, translate 200ms; }
  }

  &:has(input:disabled) {
    background-color: --color-disabled(var(--color-control));
    cursor: not-allowed;

    &:has(input:checked) { background-color: --color-disabled(var(--toggle-color, var(--color-accent-green))); }
    .knob { background-color: #aaa; }
  }

  &:has(input:checked) { background-color: var(--toggle-color, var(--color-accent-green)); }
  &:has(input:not(:disabled)):active .knob { width: 2.625rem; }
  &:has(input:checked:not(:disabled)):active .knob { translate: 1.125rem; }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;

    &:focus-visible { outline: none; }
    &:checked + .knob { translate: 1.375rem; }
  }

  .knob {
    height: 100%;
    width: 2.375rem;
    background-color: white;
    border-radius: var(--border-radius-round);
  }
}
</style>