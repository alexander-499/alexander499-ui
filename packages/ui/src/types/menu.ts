import type { IconType } from "@/components/ui/Icon.vue";

export type MenuItem = {
  label: string;
  disabled?: boolean;
} & ({
  icon?: IconType;
  image?: never
} | {
  icon?: never;
  image?: string
}) & ({
  action?: () => void;
  shortcut?: string[];
  destructive?: boolean;
  submenu?: never;
} | {
  submenu: MenuItems;
  action?: never;
  shortcut?: never;
  destructive?: never;
});

export interface MenuSeparator {
  separator: true | string;
}

export type MenuItems = (MenuItem | MenuSeparator)[];
export type MenuSource<T = void> = MenuItems | ((context: T) => MenuItems);
export type MenuAnchor = Event | Element | { x: number; y: number };