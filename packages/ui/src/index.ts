export { default as Button } from "@/components/ui/Button.vue";
export { default as Slider } from "@/components/ui/Slider.vue";
export { default as Toggle } from "@/components/ui/Toggle.vue";
export { default as Checkbox } from "@/components/ui/Checkbox.vue";
export { default as SegmentedControl } from "@/components/ui/SegmentedControl.vue";
export { default as Stepper } from "@/components/ui/Stepper.vue";
export { default as PageControl } from "@/components/ui/PageControl.vue";
export { default as Icon } from "@/components/ui/Icon.vue";

// Fields
export { default as TextField } from "@/components/ui/fields/TextField.vue";
export { default as NumberField } from "@/components/ui/fields/NumberField.vue";
export { default as SearchField } from "@/components/ui/fields/SearchField.vue";

// Floating
export { default as Dialog } from "@/components/ui/floating/Dialog.vue";
export { default as Popover } from "@/components/ui/floating/Popover.vue";
export { default as Menu } from "@/components/ui/floating/Menu.vue";
export type { MenuItem, MenuSeparator, MenuItems, MenuSource, MenuAnchor } from "@/types/menu.ts";
export { default as Notification } from "@/components/ui/floating/Notification.vue";
export { default as NotificationGroup } from "@/components/ui/floating/NotificationGroup.vue";

// Composables
export { useUI } from "@/composables/useUI";
export { teleportTargetKey } from "@/composables/useTeleportTarget";

import "@/styles/reset.css";
import "@/styles/general.css";
import "@/styles/variables.css";