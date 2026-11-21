<script setup lang="ts">
import { nextTick } from "vue";
import Notification from "@/components/ui/floating/Notification.vue";
import { useUI, notificationItems } from "@/composables/useUI";
import { useTeleportTarget } from "@/composables/useTeleportTarget";

const props = withDefaults(defineProps<{
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  duration?: number;
}>(), {
  position: "bottom-right",
  duration: 5000
});

const ui = useUI();
const teleportTarget = useTeleportTarget();

function handleBeforeLeave(element: Element) {
  const rect = element.getBoundingClientRect();
  const parent = element.parentElement!.getBoundingClientRect();
  (element as HTMLElement).style.top = `${rect.top - parent.top}px`;
  (element as HTMLElement).style.left = `${rect.left - parent.left}px`;
  (element as HTMLElement).style.width = `${rect.width}px`;
}

const onMountedNotificationGroup = async ({ el }) => {
  if (!(el && typeof el.showPopover === "function")) return;
  await nextTick();
  el.showPopover();
};
</script>

<template>
  <Teleport :to="teleportTarget">
    <TransitionGroup
      name="notification"
      tag="div"
      class="notification-group"
      :class="props.position.split('-')"
      popover="manual"
      @before-leave="handleBeforeLeave"
      @vue:mounted="onMountedNotificationGroup"
    >
      <Notification
        v-for="item in notificationItems"
        :key="item.id"
        :title="item.title"
        :message="item.message"
        :type="item.type"
        :duration="props.duration"
        @dismiss="ui.notification.dismiss(item.id)"
      />
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.notification-group {
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
  background-color: transparent;
  border: none;
  padding: 1rem;
  overflow: hidden;
  pointer-events: none;

  &.top {
    flex-direction: column-reverse;
    --notification-enter-y: -100dvh;
  }

  &.bottom { --notification-enter-y: 100dvh; }

  &.left {
    align-items: flex-start;
    --notification-leave-x: -100vw;
  }

  &.center {
    align-items: center;
    --notification-leave-x: 4rem;
  }

  &.right {
    align-items: flex-end;
    --notification-leave-x: 100vw;
  }

  .notification {
    pointer-events: auto;

    &.notification-enter-active { animation: notification-enter 350ms both; }
  
    &.notification-leave-active {
      position: absolute;
      pointer-events: none;
      animation: notification-leave 350ms ease-in both;
    }
  
    &.notification-move { transition: transform 350ms; }
  }
}

@keyframes notification-enter {
  from {
    opacity: 0;
    translate: 0 var(--notification-enter-y);
  } to {
    opacity: 1;
    translate: 0;
  }
}

@keyframes notification-leave {
  to {
    opacity: 0;
    translate: var(--notification-leave-x);
  }
}
</style>