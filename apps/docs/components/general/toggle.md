<script setup lang="ts">
import { Toggle } from "@alexander499/ui";
</script>

# Toggle

A control that toggles between on and off states.

<Demo>
  <Toggle model-value/>
  <Toggle disabled/>
  <Toggle model-value disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type      | Default |
| ------------ | --------- | ------- |
| `modelValue` | `boolean` | -       |
| `disabled`   | `boolean` | -       |

### CSS Variables

| Variable         | Type      |
| ---------------- | --------- |
| `--toggle-color` | `<color>` |