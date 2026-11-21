<script setup lang="ts">
import { onMounted, onUnmounted, provide, shallowRef, useTemplateRef } from "vue";
import { teleportTargetKey } from "@alexander499/ui";

defineProps<{
  column?: boolean;
}>();

const host = useTemplateRef<HTMLDivElement>("host");
const shadowTarget = shallowRef<HTMLDivElement | null>(null);
provide(teleportTargetKey, shadowTarget);
let observer: MutationObserver | undefined;

onMounted(() => {
  const shadow = host.value!.attachShadow({ mode: "open" });

  const uiStyle = document.createElement("style");
  shadow.append(uiStyle);

  function syncStyles() {
    const css = Array.from(document.head.querySelectorAll<HTMLStyleElement>("style[data-vite-dev-id]"))
      .filter(style => style.dataset.viteDevId ?.replaceAll("\\", "/") .includes("/packages/ui/src/"))
      .map(style => style.textContent)
      .join("\n");

    if (uiStyle.textContent !== css) uiStyle.textContent = css;
  }

  syncStyles();
  observer = new MutationObserver(syncStyles);
  observer.observe(document.head, { childList: true, characterData: true, subtree: true });

  const target = document.createElement("div");
  target.part = "content";
  shadow.append(target);
  shadowTarget.value = target;
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <div ref="host" class="demo">
    <Teleport v-if="shadowTarget" :to="shadowTarget">
      <slot/>
    </Teleport>
  </div>
</template>

<style scoped>
.demo {
  background-color: var(--vp-c-bg-alt);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}
</style>

<style>
.demo::part(content) {
  display: flex;
  flex-direction: v-bind("column ? 'column' : 'row'");
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
</style>