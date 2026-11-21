<script setup lang="ts">
import { computed, useSlots } from "vue";
import Icon/*, { type IconType } */ from "@/components/ui/Icon.vue";
import { capitalize } from "@/utils";

const slots = useSlots();

const key = computed(() => (slots.default?.() ?? []).map(v => (typeof v.children === "string" ? v.children : "")).join("").trim());

// BUG Make Kbd API better
// const keyMap: Record<string, IconType> = {
//   "⇧": "arrow-big-up",
//   "⌃": "chevron-up",
//   "⌥": "option",
//   "⌘": "command",
//   "+": "plus",
//   "-": "minus",
//   "↑": "arrow-up",
//   "↓": "arrow-down",
//   "←": "arrow-left",
//   "→": "arrow-right"
// };
</script>

<template>
  <kbd class="kbd">
    <Icon v-if="key === 'shift'" name="arrow-big-up"/>
    <template v-else>{{ capitalize(key) }}</template>
  </kbd>
</template>

<style scoped>
.kbd {
  display: flex;
  font-family: inherit;
  --icon-size: 1rem;
}
</style>