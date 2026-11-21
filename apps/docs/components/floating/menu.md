<script setup lang="ts">
import { Button, Menu, type MenuItems, useUI } from "@alexander499/ui";

const ui = useUI();

const contextMenu: MenuItems = [
  { label: "Cut", icon: "scissors", shortcut: ["ctrl", "x"], action: () => console.log("Cut") },
  { label: "Copy", icon: "copy", shortcut: ["ctrl", "c"], action: () => console.log("Copy") },
  { label: "Paste", icon: "clipboard-paste", shortcut: ["ctrl", "v"], action: () => console.log("Paste") },
  { separator: "Header" },
  { label: "Destructive", destructive: true, action: () => console.log("Destructive") },
  { label: "Disabled", disabled: true, action: () => console.log("Disabled") },
  { label: "Image", image: "https://picsum.photos/64/64", action: () => console.log("Image") },
  { separator: true },
  { label: "Submenu", icon: "sparkles", submenu: [
    { label: "Item" },
    { label: "Nested Submenu", submenu: [
      { label: "Item 1" },
      { label: "Item 2" }
    ]}
  ]}
];
</script>

# Menu

<Demo @contextmenu.prevent="ui.menu.open(contextMenu, $event)">
  <Menu></Menu>
  <Button @click="ui.menu.open(contextMenu, $event)">Open Menu</Button>
  or Right-Click
</Demo>