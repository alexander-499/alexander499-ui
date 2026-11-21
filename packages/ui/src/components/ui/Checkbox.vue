<script setup lang="ts">
import { useId } from "vue";
import Icon from "@/components/ui/Icon.vue";

defineProps<{
  label: string;
  disabled?: boolean;
}>();

const model = defineModel<boolean>();

const id = useId();
</script>

<template>
  <label class="checkbox" :for="id">
    <span class="input">
      <input v-model="model" :id type="checkbox" :disabled>
      <span>
        <Icon name="check"/>
      </span>
    </span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<style scoped>
.checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;

  &:hover .input input:not(:is(:checked, :disabled)) + span { background-color: var(--color-control-hover); }
  &:active .input:has(input:not(:disabled)) span { scale: 0.9; }

  &:has(input:disabled) {
    cursor: not-allowed;

    .input input:checked + span { background-color: --color-disabled(var(--checkbox-color, var(--color-accent-blue))); }

    .input span {
      color: var(--color-text-tertiary);
      background-color: --color-disabled(var(--color-control));
    }

    .label { color: var(--color-text-tertiary); }
  }

  .input {
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 8px;
    corner-shape: superellipse(1.6);

    &:has(input:focus-visible) {
      outline: var(--focus-outline);
      outline-offset: var(--focus-outline-offset);
    }

    input {
      position: absolute;
      opacity: 0;
      pointer-events: none;

      &:focus-visible { outline: none; }
      &:not(:checked) + span .icon { scale: 0; }
      &:checked + span { background-color: var(--checkbox-color, var(--color-accent-blue)); }
    }

    span {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-control);
      border-radius: inherit;
      corner-shape: inherit;
      pointer-events: none;
      transition: background-color 200ms, scale 200ms;

      .icon {
        transition: scale 200ms;
        --icon-size: 1rem;
      }
    }
  }

  .label { color: var(--color-text-secondary); }
}
</style>