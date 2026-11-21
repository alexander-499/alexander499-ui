<script setup lang="ts">
import { h, Text, useSlots, type AnchorHTMLAttributes, type FunctionalComponent } from "vue";
import { RouterLink, type RouteLocationRaw } from "vue-router";
import { when } from "@/utils";

withDefaults(defineProps<{
  to?: RouteLocationRaw;
  href?: string;
  target?: AnchorHTMLAttributes["target"];
  appearance?: "text" | "bordered" | "filled";
  size?: "small" | "medium";
  disabled?: boolean;
}>(), {
  appearance: "bordered",
  size: "medium"
});

const slots = useSlots();

const Slot: FunctionalComponent = () => (slots.default?.() ?? []).map(node =>
  node.type === Text
  && typeof node.children === "string"
  && node.children.trim() ? h("span", null, node.children) : node
);
</script>

<template>
  <component
    :is="to ? RouterLink : href ? 'a' : 'button'"
    class="button"
    type="button"
    :to
    :href
    :target="when(href, target)"
    :disabled="when(!to && !href, disabled)"
    :data-appearance="appearance"
    :data-size="size"
  >
    <Slot/>
  </component>
</template>

<style scoped>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
  font-family: var(--font-family-base);
  text-decoration: none;
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--border-radius-round);
  cursor: pointer;  
  user-select: none;
  transition: color 200ms, background-color 200ms, scale 200ms;
  --button-border: 0px;

  &:active:not(:disabled) { scale: 0.9; }
  &:not([data-appearance="bordered"]) { border: none; }
  &:not([data-appearance="filled"]) { color: var(--button-color, var(--color-text-secondary)); }

  &:disabled {
    color: var(--color-text-tertiary);
    cursor: not-allowed;
  }

  &[data-appearance="text"] { background-color: transparent; }

  &[data-appearance="bordered"] {
    background-color: var(--color-control);
    --button-border: 1px;

    &:hover:not(:disabled) { background-color: var(--color-control-hover); }

    &:disabled {
      background-color: --color-disabled(var(--color-control));
      border-color: --color-disabled(var(--color-border-subtle));
    }
  }

  &[data-appearance="filled"] {
    color: var(--color-text-primary);
    background-color: var(--button-color, var(--color-accent-blue));

    &:disabled {
      color: var(--color-text-tertiary);
      background-color: --color-disabled(var(--button-color, var(--color-accent-blue)));
    }
  }

  &[data-size="small"] {
    padding: 0.25rem 0.625rem;
    height: 2rem;

    &:deep(.icon:first-child), &:deep(img:first-child) { margin-left: calc(-0.375rem - var(--button-border)); }
    &:deep(.icon:last-child), &:deep(img:last-child) { margin-right: calc(-0.375rem - var(--button-border)); }
  }

  &[data-size="medium"] {
    padding: 0.375rem 0.75rem;
    height: 2.5rem;

    &:deep(.icon:first-child), &:deep(img:first-child) { margin-left: calc(-0.25rem - var(--button-border)); }
    &:deep(.icon:last-child), &:deep(img:last-child) { margin-right: calc(-0.25rem - var(--button-border)); }
  }

  &:deep(img) { height: 1.5rem; }
}
</style>