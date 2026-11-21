<script setup lang="ts">
import { shallowRef, useTemplateRef } from "vue";
import { onClickOutside, onKeyStroke } from "@vueuse/core";
import { arrow, autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/vue";
import { registerUIComponent, useUIRegistration, type PopoverAnchor } from "@/composables/useUI";
import { useTeleportTarget } from "@/composables/useTeleportTarget";

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  id: string;
}>();

const open = defineModel<boolean>("open");

const teleportTarget = useTeleportTarget();

const referenceEl = shallowRef<Element | null>(null);
const popover = useTemplateRef<HTMLDivElement>("popover");
const popoverArrow = useTemplateRef<HTMLDivElement>("popover-arrow");

const { floatingStyles, placement, middlewareData } = useFloating(referenceEl, popover, {
  open,
  placement: "top",
  strategy: "fixed",
  middleware: [
    offset(12),
    flip({ padding: 8 }),
    shift({ padding: 8 }),
    arrow({ element: popoverArrow, padding: 8 })
  ],
  whileElementsMounted: autoUpdate
});

function openAt(anchor: PopoverAnchor) {
  const target = anchor instanceof Event ? anchor.currentTarget : anchor;
  if (!(target instanceof Element)) return console.warn("[@alexander499/ui] Invalid popover anchor.");
  referenceEl.value = target;
  open.value = true;
}

const close = () => open.value = false;

useUIRegistration(registerUIComponent.popover, props.id, {
  open: openAt,
  close,
  toggle: anchor => open.value ? close() : openAt(anchor)
});

onClickOutside(popover, close, { ignore: [referenceEl as unknown as HTMLElement] });

onKeyStroke("Escape", e => {
  if (!open.value) return;
  e.preventDefault();
  close();
  if (referenceEl.value instanceof HTMLElement) referenceEl.value.focus({ preventScroll: true });
});
</script>

<template>
  <Teleport :to="teleportTarget">
    <Transition>
      <div v-if="open" ref="popover" class="popover" :class="placement" :style="floatingStyles" :="$attrs">
        <slot/>
        <div ref="popover-arrow" class="arrow" :style="{ left: middlewareData.arrow?.x == null ? undefined : `${middlewareData.arrow.x}px` }"/>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.popover {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: 12px;
  padding: 0.75rem;
  z-index: var(--z-index-floating);
  transition: opacity 200ms, margin 200ms;

  &.v-enter-from, &.v-leave-to {
    opacity: 0;
    margin-block-start: 0.5rem;
    pointer-events: none;
  }

  .arrow {
    height: 0.625rem;
    width: 0.625rem;
    position: absolute;
    background-color: inherit;
    border: inherit;
    border-width: 0 1px 1px 0;
    border-bottom-right-radius: 4px;

  }

  &.top .arrow {
    bottom: -0.375rem;
    rotate: 45deg;
  }

  &.bottom .arrow {
    top: -0.375rem;
    rotate: 225deg;
  }
}
</style>