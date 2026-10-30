<script setup lang="ts">
import { computed } from "vue";
import * as lucideIcons from "@lucide/vue";
import { toPascalCase, type KebabCase } from "@/utils";

const props = defineProps<{
  name: KebabCase<keyof typeof lucideIcons>;
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