<script setup lang="ts">
defineProps<{
  type?: "text" | "number";
  placeholder?: string;
  size?: "medium";
}>();

const model = defineModel<string | number>();
</script>

<template>
  <div class="text-field" :data-size="size">
    <input v-model="model" :type :placeholder autocomplete="off">
  </div>
</template>

<style scoped>
.text-field {
  color: var(--color-text-secondary);

  input {
    height: 2.5rem;
    background-color: var(--color-control);
    font-size: 1rem;
    font-family: var(--font-family-base);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--border-radius-round);
    padding: 0.375rem 0.75rem;
    user-select: none;
  
    &::placeholder { color: var(--color-text-tertiary); }
  }
}

</style>