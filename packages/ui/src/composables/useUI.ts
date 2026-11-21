import { onMounted, onUnmounted, shallowRef } from "vue";
import type { VirtualElement } from "@floating-ui/vue";
import type { NotificationType } from "@/components/ui/floating/Notification.vue";
import { toKebabCase } from "@/utils";
import type { MenuAnchor, MenuItems, MenuSource } from "@/types/menu";

// Dialog, Popover
export type PopoverAnchor = Element | Event;

interface DialogController {
  open(): void;
  close(): void;
  toggle(): void;
}

interface PopoverController {
  open(anchor: PopoverAnchor): void;
  close(): void;
  toggle(anchor: PopoverAnchor): void;
}

type Controller = {
  open: (...args: never[]) => void;
  close: () => void;
  toggle: (...args: never[]) => void;
};

function createRegistry<T extends Controller>(name: string) {
  const components = new Map<string, T>();

  function call(id: string, action: keyof Controller, args: unknown[]) {
    const component = components.get(id);
    if (!component) return console.warn(`[@alexander499/ui] ${name} "${id}" is not registered.`);
    Reflect.apply(component[action], component, args);
  }

  function register(id: string, controller: T) {
    if (components.has(id)) throw new Error(`[@alexander499/ui] ${name} "${id}" is already registered.`);
    components.set(id, controller);
    return () => {
      if (components.get(id) === controller) components.delete(id);
    };
  }

  return {
    register,
    actions: {
      open: (id: string, ...args: Parameters<T["open"]>) => call(id, "open", args),
      close: (id: string) => call(id, "close", []),
      toggle: (id: string, ...args: Parameters<T["toggle"]>) => call(id, "toggle", args)
    }
  };
}

const dialogs = createRegistry<DialogController>("Dialog");
const popovers = createRegistry<PopoverController>("Popover");

export const registerUIComponent = {
  dialog: dialogs.register,
  popover: popovers.register
};

// Menu
interface ActiveMenu {
  reference: Element | VirtualElement;
  trigger: Element | null;
  getItems: () => MenuItems;
  version: number;
}

export const activeMenu = shallowRef<ActiveMenu | null>(null);
let menuVersion = 0;

const closeMenu = () => activeMenu.value = null;
function openMenu<T>(items: MenuSource<T>, anchor: MenuAnchor, context?: T) {
  let reference: Element | VirtualElement;
  let trigger: Element | null = null;

  if (anchor instanceof MouseEvent && anchor.type === "contextmenu") {
    const { clientX: x, clientY: y } = anchor;
    reference = { getBoundingClientRect: () => new DOMRect(x, y, 0, 0) };
  } else {
    const target = anchor instanceof Event ? anchor.currentTarget : anchor;
    if (target instanceof Element) {
      reference = target;
      if (anchor instanceof Event && anchor.type === "click") trigger = target;
    } else if (!(anchor instanceof Event) && "x" in anchor && "y" in anchor)
      reference = { getBoundingClientRect: () => new DOMRect(anchor.x, anchor.y, 0, 0) };
    else return console.warn("[@alexander499/ui] Invalid menu anchor.");
  }

  if (trigger && activeMenu.value?.trigger === trigger) return closeMenu();

  activeMenu.value = {
    reference,
    trigger,
    getItems: () => typeof items === "function" ? items(context!) : items,
    version: ++menuVersion
  };
}

export const menuController = {
  open: openMenu,
  close: closeMenu
};

// Notification
export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
}

export const notificationItems = shallowRef<NotificationItem[]>([]);

let nextNotificationId = 0;
const notification = {
  push(title: string, message = "", type: NotificationType = "info") {
    const id = ++nextNotificationId;
    notificationItems.value = [...notificationItems.value, { id, title, message, type }];
    return id;
  },
  dismiss: (id: number) => notificationItems.value = notificationItems.value.filter(item => item.id !== id),
  clear: () => notificationItems.value = []
};

// UI Composable
const ui = {
  dialog: dialogs.actions,
  popover: popovers.actions,
  menu: menuController,
  notification
};

export function useUIRegistration<T>(register: (id: string, controller: T) => () => void, id: string, controller: T) {
  let unregister: (() => void) | undefined;
  onMounted(() => unregister = register(toKebabCase(id), controller));
  onUnmounted(() => unregister?.());
}

export function useUI() {
  return ui;
}