<script setup lang="ts">
import Button from "@/components/ui/Button.vue";
import Icon from "@/components/ui/Icon.vue";
import { onBeforeMount, useId, useTemplateRef, watch } from "vue";
import { registerUIComponent, useUIRegistration } from "@/composables/useUI";
import { useTeleportTarget } from "@/composables/useTeleportTarget";

defineOptions({
  inheritAttrs: false
});

const props = defineProps<{
  id: string;
  title: string;
}>();

const open = defineModel<boolean>("open");

const teleportTarget = useTeleportTarget();
const dialog = useTemplateRef("dialog");
const titleId = useId();

function syncOpen() {
  if (!dialog.value) return;
  if (open.value && !dialog.value.open) dialog.value.showModal();
  else if (!open.value && dialog.value.open) dialog.value.close();
}

watch(open, syncOpen, { flush: "post" });

onBeforeMount(() => syncOpen());
useUIRegistration(registerUIComponent.dialog, props.id, {
  open: () => open.value = true,
  close: () => open.value = false,
  toggle: () => open.value = !open.value
});
</script>

<template>
  <Teleport :to="teleportTarget">
    <dialog ref="dialog" class="dialog" closedby="any" :aria-labelledby="titleId" :="$attrs" @close="open = false">
      <header>
        <h2 v-if="title" :id="titleId">{{ title }}</h2>
        <Button class="close-button" size="small" aria-label="Close dialog" @click="open = false">
          <Icon name="x"/>
        </Button>
      </header>
      <div class="main">
        <slot/>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.dialog {
  width: min(16rem, 100vw);
  max-height: 100dvh;
  display: none;
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border-subtle);
  border-radius: 16px;
  margin: auto;
  padding: 0.75rem;
  overflow: hidden;
  opacity: 0;
  scale: 0.8;
  transition: display 200ms allow-discrete, opacity 200ms, scale 200ms, overlay 200ms allow-discrete;

  &[open] {
    display: block;
    opacity: 1;
    scale: 1;

    @starting-style {
      opacity: 0;
      scale: 0.8;
    }

    &::backdrop {
      opacity: 1;

      @starting-style { opacity: 0; }
    }
  }

  &::backdrop {
    background-color: #0004;
    backdrop-filter: blur(4px);
    opacity: 0;
    transition: opacity 200ms;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--color-border-subtle);

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  .main { padding-top: 0.75rem; }
}
</style>