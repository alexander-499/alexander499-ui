<script setup lang="ts">
defineProps<{
  pages: number;
  disabled?: boolean;
}>();

const model = defineModel<number>();
</script>

<template>
  <div class="page-control">
    <button
      v-for="(_, page) in pages"
      :key="page"
      :class="{ active: model === page }"
      :disabled
      @click="model = page"
    >
      <div/>
    </button>
  </div>
</template>

<style scoped>
.page-control {
  display: flex;
  align-items: center;
  background-color: var(--color-control);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--border-radius-round);
  padding: 0 0.5rem;

  &:has(button:disabled) {
    background-color: --color-disabled(var(--color-control));
    border-color: --color-disabled(var(--color-border-subtle));

    &, button:disabled { cursor: not-allowed; }
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0.5rem 0.25rem;
    cursor: pointer;

    &:not(.active) div { background-color: var(--color-control); }
    &:hover:not(.active) div { background-color: var(--color-control-hover); }

    &:disabled:not(.active) div { background-color: --color-disabled(var(--color-control)); }
    &:disabled div { background-color: var(--color-text-tertiary); }

    div {
      height: 0.5rem;
      width: 0.5rem;
      background-color: var(--color-text-primary);
      border-radius: var(--border-radius-round);
      transition: background-color 200ms;
    }
  }
}
</style>