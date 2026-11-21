<script setup lang="ts" generic="T extends string | number | boolean">
defineProps<{
  options: {
    value: T;
    label: string;
  }[];
  disabled?: boolean;
}>();

const model = defineModel<T>();
</script>

<template>
  <div class="segmented-control" role="radiogroup">
    <label v-for="option in options" :key="option.value.toString()">
      <input type="radio" :value="option.value" :checked="model === option.value" :disabled @change="model = option.value">
      <span>{{ option.label }}</span>
    </label>
  </div>
</template>

<style scoped>
.segmented-control {
  height: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.125rem;
  background-color: var(--color-control);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--border-radius-round);
  padding: 0.125rem;
  user-select: none;

  &:has(input:disabled) {
    background-color: --color-disabled(var(--color-control));
    border-color: --color-disabled(var(--color-border-subtle));
  }

  label {
    height: 100%;
    display: flex;
    align-items: center;
    color: var(--color-text-secondary);
    border-radius: var(--border-radius-round);
    padding: 0 0.75rem;
    cursor: pointer;
    transition: background-color 200ms, scale 200ms;

    &:has(input:checked) { background-color: var(--color-control); }
    &:hover:has(input:checked:not(:disabled)) { background-color: var(--color-control-hover); }
    &:active:has(input:not(:disabled)) { scale: 0.9; }

    &:has(input:disabled) {
      color: var(--color-text-tertiary);
      cursor: not-allowed;

      &:has(input:checked) { background-color: --color-disabled(var(--color-control)); }
    }

    &:has(input:focus-visible) {
      outline: var(--focus-outline);
      outline-offset: var(--focus-outline-offset);
    }

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;

      &:focus-visible { outline: none; }
    }
  }
}
</style>