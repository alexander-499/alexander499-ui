<script setup lang="ts">
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";

withDefaults(defineProps<{
  placeholder?: string;
  size?: "medium";
}>(), {
  placeholder: "Search"
});

const model = defineModel<string>();
</script>

<template>
  <div class="text-field" :data-size="size">
    <input v-model="model" type="search" :placeholder autocomplete="off">
    <Icon name="search"/>
    <Button v-show="model && model.length > 0" class="cancel-button" appearance="text" size="small" @click="model = ''"><Icon name="x"/></Button>
  </div>
</template>

<style scoped>
.text-field {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);

  input {
    height: 2.5rem;
    background-color: var(--color-control);
    font-size: 1rem;
    font-family: var(--font-family-base);
    border: 1px solid var(--color-border-subtle);
    border-radius: var(--border-radius-round);
    padding: 0.375rem 2.25rem;
    user-select: none;

    &::placeholder { color: var(--color-text-tertiary); }
    &::-webkit-search-cancel-button { display: none; }
  }

  .lucide-search {
    position: absolute;
    left: 0.5rem;
    pointer-events: none;
  }

  .cancel-button {
    position: absolute;
    right: 0.25rem;
  }
}
</style>