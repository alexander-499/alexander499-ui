<script setup lang="ts" generic="T extends string | number">
import { useId } from "vue";

withDefaults(defineProps<{
  type?: "text" | "email" | "password" | "tel" | "url" | "number" | "search";
  autocomplete?: string;
  placeholder?: string;
  disabled?: boolean;
}>(), {
  type: "text"
});

const model = defineModel<T>();
const id = useId();
</script>

<template>
  <div class="field">
    <div v-if="$slots.start" class="start">
      <slot name="start"/>
    </div>
    <input
      v-model="model"
      :id="$attrs.id as string ?? id"
      :type
      :placeholder
      :autocomplete
      :disabled
    >
    <div v-if="$slots.end" class="end">
      <slot name="end"/>
    </div>
  </div>
</template>

<style scoped>
.field {
  width: 16rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-text-secondary);
  background-color: var(--color-control);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--border-radius-round);
  padding: 0 0.75rem;

  &:has(input:disabled) {
    background-color: --color-disabled(var(--color-control));
    border-color: --color-disabled(var(--color-border-subtle));

    input::placeholder { color: var(--color-text-quaternary); }
    :is(.start, .end):deep(> .icon) { color: var(--color-text-tertiary); }
  }

  &:has(input:focus-visible) {
    outline: var(--focus-outline);
    outline-offset: var(--focus-outline-offset);
  }

  input {
    height: 2.5rem;
    width: 100%;
    flex: 1;
    background-color: transparent;
    font-size: 1rem;
    font-family: var(--font-family-base);
    border: none;
    user-select: none;

    &:disabled { cursor: not-allowed; }
    &:focus-visible { outline: none; }
    &::placeholder { color: var(--color-text-tertiary); }
    &::-webkit-inner-spin-button,
    &::-webkit-search-cancel-button { appearance: none; }
  }

  .start, .end {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    &.start { margin-left: -0.5rem; }
    &.end { margin-right: -0.5rem; }
    &.start:deep(> .icon:first-of-type) { margin-left: 0.25rem; }
    &.end:deep(> .icon:last-of-type) { margin-right: 0.25rem; }
    &.start:deep(> .button[data-appearance="text"]:last-of-type) { margin-right: -0.25rem; }
    &.end:deep(> .button[data-appearance="text"]:first-of-type) { margin-left: -0.25rem; }
  }
}
</style>