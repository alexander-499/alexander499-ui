<script setup lang="ts">
import { watch } from "vue";
import { useCountdown } from "@vueuse/core";
import Icon from "@/components/ui/Icon.vue";

export type NotificationType = "info" | "success" | "warning" | "error";

const props = withDefaults(defineProps<{
  title: string,
  message: string,
  type?: NotificationType,
  duration?: number;
}>(), {
  type: "info",
  duration: 5000
});

const emit = defineEmits<{
  dismiss: [];
}>();

const countdown = useCountdown(0, { onComplete: () => emit("dismiss") });
watch(() => props.duration, duration => countdown.start(duration / 1000), { immediate: true });
</script>

<template>
  <div class="notification" @pointerenter="countdown.pause" @pointerleave="countdown.resume">
    <div class="icon-wrapper" :class="type">
      <Icon :name="type === 'info' ? 'info' : type === 'success' ? 'check' : 'triangle-alert'"/>
    </div>
    <div class="main">
      <strong>{{ title }}</strong>
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.notification {
  min-width: 16rem;
  display: flex;
  gap: 0.5rem;
  background-color: var(--color-bg-secondary); 
  border: 1px solid var(--color-border-subtle);
  border-radius: 16px;
  padding: 0.75rem;

  .icon-wrapper {
    height: 2rem;
    width: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: alpha(from currentColor / 0.2);
    border-radius: var(--border-radius-round);

    &.info { color: var(--color-accent-blue); }
    &.success { color: var(--color-accent-green); }
    &.warning { color: var(--color-accent-yellow); }
    &.error { color: var(--color-accent-red); }
  }

  .main {
    flex: 1;

    strong { font-size: 1.125rem; }
  }
}
</style>