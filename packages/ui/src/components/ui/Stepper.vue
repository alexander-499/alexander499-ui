<script setup lang="ts">
import Icon from "@/components/ui/Icon.vue";

const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}>(), {
  min: 0,
  max: 100,
  step: 1
});

const model = defineModel<number>();

function handleClick(value: number) {
  if (model.value == null) return;
  model.value = Math.min(Math.max(model.value + value, props.min), props.max);
}
</script>

<template>
  <div class="stepper">
    <button :disabled="props.disabled || model === props.min" appearance="text" size="small" @click="handleClick(-step)"><Icon name="minus"/></button>
    <div class="separator"/>
    <button :disabled="props.disabled || model === props.max" appearance="text" size="small" @click="handleClick(step)"><Icon name="plus"/></button>
  </div>
</template>

<style scoped>
.stepper {
  height: 2.5rem;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-round);

  &:has(button:disabled) button {
    color: var(--color-text-tertiary);
    background-color: --color-disabled(var(--color-control));
    border-color: --color-disabled(var(--color-border-subtle));
    cursor: not-allowed;

    + .separator { background-color: --color-disabled(var(--color-border-strong)); }
  }

  button {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    background-color: var(--color-control);
    border: 1px solid var(--color-border-subtle);
    padding: 0 0.5rem;
    cursor: pointer;
    transition: background-color 200ms;

    &:first-child {
      border-right: none;
      border-radius: var(--border-radius-round) 0 0 var(--border-radius-round);
    }

    &:last-child {
      border-left: none;
      border-radius: 0 var(--border-radius-round) var(--border-radius-round) 0;
    }

    &:hover:not(:disabled) { background-color: var(--color-control-hover); }
    &:active:not(:disabled) .icon { scale: 0.9; }

    .icon { transition: scale 200ms; }
  }

  .separator {
    height: 1.25rem;
    width: 1px;
    position: absolute;
    left: 50%;
    background-color: var(--color-border-strong);
    border-radius: var(--border-radius-round);
    translate: -50%;
    pointer-events: none;
  }
}
</style>