<script setup lang="ts">
import { computed } from "vue";
import * as lucideIcons from "@lucide/vue";
import { toPascalCase, type KebabCase } from "@/utils";

// TODO Make the IconType exclusively include icon names.
export type IconType = KebabCase<keyof typeof lucideIcons>;

const props = defineProps<{
  name: IconType;
}>();

const iconComponent = computed(() => {
  const icon = (lucideIcons as Record<string, unknown>)[toPascalCase(props.name)];
  if (!icon) console.warn(`[@alexander499/ui] Icon ${props.name} does not exist.`);
  return icon ?? null;
});
</script>

<template>
  <component :is="iconComponent" class="icon"/>
</template>

<style scoped>
.icon {
  height: var(--icon-size, 1.5rem);
  width: var(--icon-size, 1.5rem);
}
</style>