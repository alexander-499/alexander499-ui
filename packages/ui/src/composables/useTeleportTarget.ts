import { computed, inject, type InjectionKey, type Ref } from "vue";

export const teleportTargetKey: InjectionKey<Ref<HTMLElement | null>> = Symbol("teleport-target");

export function useTeleportTarget() {
  const target = inject(teleportTargetKey, null);
  return computed(() => target?.value ?? "body");
}