<script setup lang="ts">
import { Button, Icon } from "@alexander499/ui";
</script>

# Button

A control that initiates an action.

<Demo>
  <Button appearance="text">Text</Button>
  <Button appearance="bordered">Bordered</Button>
  <Button appearance="filled">Filled</Button>
</Demo>

<Demo>
  <Button appearance="text" disabled>Disabled Text</Button>
  <Button appearance="bordered" disabled>Disabled Bordered</Button>
  <Button appearance="filled" disabled>Disabled Filled</Button>
</Demo>

<Demo>
  <Button size="small">Small</Button>
  <Button size="medium">Medium</Button>
</Demo>

<Demo>
  <Button><Icon name="settings"/></Button>
  <Button><Icon name="settings"/>Icon</Button>
</Demo>

## API Reference

### Props

| Prop         | Type                               | Default    |
| ------------ | ---------------------------------- | ---------- |
| `to`         | `RouteLocationRaw`                 | -          |
| `href`       | `string`                           | -          |
| `target`     | `AnchorHTMLAttributes["target"]`   | -          |
| `appearance` | `"text" \| "bordered" \| "filled"` | `bordered` |
| `size`       | `"small" \| "medium"`              | `medium`   |
| `disabled`   | `boolean`                          | -          |

### CSS Variables

| Variable         | Type      |
| ---------------- | --------- |
| `--button-color` | `<color>` |