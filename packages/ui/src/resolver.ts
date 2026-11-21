import type { ComponentResolver } from "unplugin-vue-components";

const components = new Set([
  "Button",
  "Slider",
  "Toggle",
  "Checkbox",
  "SegmentedControl",
  "Stepper",
  "PageControl",
  "Icon",
  "TextField",
  "NumberField",
  "SearchField",
  "Dialog",
  "Popover"
]);

export default function UIResolver(): ComponentResolver {
  return name => {
    if (!components.has(name)) return null;
    return { name, from: "@alexander499/ui" };
  };
}