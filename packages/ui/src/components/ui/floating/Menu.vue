<script setup lang="ts">
import { computed } from "vue";
import MenuPanel from "@/components/ui/floating/MenuPanel.vue";
import { activeMenu, menuController } from "@/composables/useUI";
import { type MenuItem } from "@/types/menu";

const items = computed(() => activeMenu.value?.getItems() ?? []);

function handleSelect(item: MenuItem) {
  menuController.close();
  item.action?.();
}
</script>

<template>
  <MenuPanel
    v-if="activeMenu"
    :key="activeMenu.version"
    class="menu"
    :items
    :anchor="activeMenu.reference"
    :trigger="activeMenu.trigger"
    @select="handleSelect"
    @dismiss="menuController.close()"
  />
</template>