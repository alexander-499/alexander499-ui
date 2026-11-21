<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, toRef, useTemplateRef } from "vue";
import { useEventListener } from "@vueuse/core";
import { autoUpdate, flip, offset, shift, useFloating, type VirtualElement } from "@floating-ui/vue";
import Icon from "@/components/ui/Icon.vue";
import Kbd from "@/components/ui/Kbd.vue";
import { useTeleportTarget } from "@/composables/useTeleportTarget";
import type { MenuItem, MenuItems } from "@/types/menu";

const props = defineProps<{
  items: MenuItems;
  anchor: Element | VirtualElement;
  trigger: Element | null;
  submenu?: boolean;
  autoSelectFirst?: boolean;
}>();

const emit = defineEmits<{
  select: [item: MenuItem];
  dismiss: [];
  closeSelf: [];
  pointerEnter: [];
  pointerLeave: [];
}>();

const teleportTarget = useTeleportTarget();
const menuPanel = useTemplateRef<HTMLDivElement>("menu-panel");

const { floatingStyles } = useFloating(toRef(props, "anchor"), menuPanel, {
  placement: computed(() => props.submenu ? "right-start" : props.anchor instanceof Element ? "bottom" : "bottom-start"),
  strategy: "fixed",
  middleware: [
    offset(props.submenu ? 0 : 8),
    flip({ padding: 8 }),
    shift({ padding: 8 })
  ],
  whileElementsMounted: autoUpdate
});

useEventListener(document, "pointerdown", e => {
  if (props.submenu) return;

  const path = e.composedPath();
  if (menuPanel.value && path.includes(menuPanel.value)) return;
  if (props.trigger && path.includes(props.trigger)) return;
  if (path.some(target => target instanceof Element && target.classList.contains("menu-panel"))) return;

  emit("dismiss");
}, { capture: true });

function isSelectable(item: MenuItems[number] | undefined): item is MenuItem {
  return Boolean(item) && !("separator" in item!) && !item!.disabled;
}

function nextEnabledIndex(from: number, direction: 1 | -1): number {
  const length = props.items.length;
  if (!length) return -1;

  const start = from === -1 ? direction === 1 ? -1 : 0 : from;

  for (let step = 1; step <= length; step++) {
    const index = (start + step * direction + length * 2) % length;
    if (isSelectable(props.items[index])) return index;
  }

  return -1;
}

const activeIndex = ref(props.autoSelectFirst ? nextEnabledIndex(-1, 1) : -1);

function select(item: MenuItem) {
  if (item.action) emit("select", item);
}

const activeSubmenu = shallowRef<{
  key: number;
  item: MenuItem;
  items: MenuItems;
  anchor: HTMLElement;
  keyboard: boolean;
} | null>(null);

let submenuKey = 0;
let submenuTimer: ReturnType<typeof setTimeout> | undefined;

function cancelSubmenuTimer() {
  clearTimeout(submenuTimer);
  submenuTimer = undefined;
}

function showSubmenu(item: MenuItem, anchor: HTMLElement, keyboard = false) {
  if (!item.submenu || item.disabled) return;

  cancelSubmenuTimer();

  activeSubmenu.value = {
    key: ++submenuKey,
    item,
    items: item.submenu,
    anchor,
    keyboard
  };
}

function scheduleSubmenuClose() {
  cancelSubmenuTimer();
  if (!activeSubmenu.value) return;

  submenuTimer = setTimeout(() => {
    activeSubmenu.value = null;
  }, 500);
}

function closeActiveSubmenu() {
  if (!activeSubmenu.value) return;

  cancelSubmenuTimer();
  activeIndex.value = props.items.indexOf(activeSubmenu.value.item);
  activeSubmenu.value = null;

  void nextTick(() => menuPanel.value?.focus({ preventScroll: true }));
}

function onItemPointerEnter(item: MenuItem, index: number, event: PointerEvent) {
  if (event.pointerType === "touch") return;

  activeIndex.value = isSelectable(item) ? index : -1;
  cancelSubmenuTimer();

  if (!item.submenu || item.disabled) {
    scheduleSubmenuClose();
    return;
  }

  if (activeSubmenu.value?.item === item) return;

  const anchor = event.currentTarget;
  if (!(anchor instanceof HTMLElement)) return;

  if (activeSubmenu.value)
    submenuTimer = setTimeout(() => showSubmenu(item, anchor), 500);
  else
    showSubmenu(item, anchor);
}

function onItemClick(item: MenuItem, event: MouseEvent) {
  if (item.disabled) return;

  if (!item.submenu) {
    select(item);
    return;
  }

  const anchor = event.currentTarget;
  if (!(anchor instanceof HTMLElement)) return;

  cancelSubmenuTimer();

  if (activeSubmenu.value?.item !== item)
    showSubmenu(item, anchor);
}

function onPanelEnter() {
  menuPanel.value?.focus({ preventScroll: true });
  cancelSubmenuTimer();
  emit("pointerEnter");
}

function onPanelLeave() {
  activeIndex.value = -1;
  scheduleSubmenuClose();
  emit("pointerLeave");
}

function onChildEnter() {
  cancelSubmenuTimer();
  emit("pointerEnter");
}

function onChildLeave() {
  scheduleSubmenuClose();
  emit("pointerLeave");
}

function activateSelected(submenuOnly = false) {
  const item = props.items[activeIndex.value];
  if (!isSelectable(item)) return;

  if (!item.submenu) {
    if (!submenuOnly) select(item);
    return;
  }

  const anchor = menuPanel.value?.querySelector<HTMLElement>(
    `[data-menu-index="${activeIndex.value}"]`
  );

  if (anchor) showSubmenu(item, anchor, true);
}

function onKeyDown(event: KeyboardEvent) {
  if (event.isComposing || event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key === "Tab") {
    emit("dismiss");
    return;
  }

  switch (event.key) {
    case "ArrowDown":
    case "ArrowUp":
      cancelSubmenuTimer();
      activeSubmenu.value = null;
      activeIndex.value = nextEnabledIndex(
        activeIndex.value,
        event.key === "ArrowDown" ? 1 : -1
      );
      break;

    case "ArrowRight":
      activateSelected(true);
      break;

    case "Enter":
    case " ":
      activateSelected();
      break;

    case "ArrowLeft":
      if (!props.submenu) return;
      emit("closeSelf");
      break;

    case "Escape":
      emit("dismiss");
      break;

    default:
      return;
  }

  event.preventDefault();
  event.stopPropagation();
}

onMounted(async () => {
  await nextTick();

  if (!props.submenu || props.autoSelectFirst)
    menuPanel.value?.focus({ preventScroll: true });
});

onUnmounted(cancelSubmenuTimer);

function menuItemSpacer(index: number): boolean {
  const before = props.items.slice(0, index).findLastIndex(i => "separator" in i) + 1;
  const after = props.items.findIndex((i, n) => n > index && "separator" in i);

  return props.items.slice(before, after < 0 ? undefined : after)
    .some(i => "icon" in i && Boolean(i.icon) || "image" in i && Boolean(i.image));
}
</script>

<template>
  <Teleport :to="teleportTarget">
    <div
      ref="menu-panel"
      class="menu-panel"
      :style="floatingStyles"
      tabindex="-1"
      @keydown="onKeyDown"
      @pointerenter="onPanelEnter"
      @pointerleave="onPanelLeave"
      @contextmenu.stop.prevent
      :="$attrs"
    >
      <template v-for="(item, index) in items" :key="index">
        <template v-if="'separator' in item">
          <div class="separator"/>
          <span v-if="typeof item.separator === 'string'" class="header">{{ item.separator }}</span>
        </template>
        <button
          v-else
          class="item"
          :class="{
            active: activeIndex === index,
            destructive: item.destructive,
            'no-action': !item.action && !item.submenu,
            'submenu-active': activeSubmenu?.item === item
          }"
          tabindex="-1"
          :disabled="item.disabled"
          :data-menu-index="index"
          @click="onItemClick(item, $event)"
          @pointerenter="onItemPointerEnter(item, index, $event)"
        >
          <Icon v-if="item.icon" class="item-icon" :name="item.icon"/>
          <img v-else-if="item.image" :src="item.image">
          <div v-else-if="menuItemSpacer(index)" class="spacer"/>
          <span class="label">{{ item.label }}</span>
          <span v-if="item.shortcut" class="shortcut">
            <Kbd v-for="key in item.shortcut" :key>{{ key }}</Kbd>
          </span>
          <Icon v-if="item.submenu" class="submenu-icon" name="chevron-right"/>
        </button>
      </template>
    </div>
  </Teleport>
  <MenuPanel
    v-if="activeSubmenu"
    :key="activeSubmenu.key"
    :items="activeSubmenu.items"
    :anchor="activeSubmenu.anchor"
    :trigger="null"
    :auto-select-first="activeSubmenu.keyboard"
    submenu
    @select="emit('select', $event)"
    @dismiss="emit('dismiss')"
    @pointer-enter="onChildEnter"
    @pointer-leave="onChildLeave"
    @close-self="closeActiveSubmenu"
  />
</template>

<style scoped>
.menu-panel {
  min-width: 12rem;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-secondary);
  padding: 0.375rem;
  border: 1px solid var(--color-border-subtle);
  border-radius: 12px;
  user-select: none;
  overflow-y: auto;
  z-index: var(--z-index-floating);

  &:focus { outline: none; }

  .separator {
    height: 1px;
    background-color: var(--color-border-subtle);
    margin: 0.25rem 0.75rem;
  }

  .header {
    color: var(--color-text-secondary);
    font-size: 0.9375rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem 0;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: transparent;
    text-align: left;
    white-space: nowrap;
    border: none;
    border-radius: 8px;
    padding: 0.25rem 0.5rem;
    transition: background-color 200ms, scale 200ms;

    &:not(:disabled) {
      .submenu-icon { color: var(--color-text-secondary); }
      &.submenu-active { background-color: var(--color-control); }

      &.active:not(.submenu-active) {
        background-color: var(--color-accent-blue);

        &.destructive { background-color: var(--color-accent-red); }
        .shortcut .kbd, .submenu-icon { color: inherit; }
      }

      &:not(.no-action) {
        cursor: pointer;

        &:active { scale: 0.95; }
      }
    }

    &:disabled {
      color: var(--color-text-tertiary);
      cursor: not-allowed;
    }

    .icon { --icon-size: 1.25rem; }

    img, .spacer {
      height: 1.25rem;
      width: 1.25rem;
    }

    .label {
      flex: 1;
      margin-right: 2rem;
    }

    .shortcut {
      display: flex;
      align-items: center;
      gap: 0.25rem;

      .kbd {
        color: var(--color-text-tertiary);
        transition: color 200ms;
      }
    }

    .submenu-icon { transition: color 200ms; }
  }
}
</style>