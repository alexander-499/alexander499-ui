<script setup lang="ts">
import { Checkbox } from "@alexander499/ui";
</script>

# Checkbox

<Demo column>
  <Checkbox model-value label="Checkbox"/>
  <Checkbox label="Checkbox" disabled/>
  <Checkbox model-value label="Checkbox" disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type      | Default |
| ------------ | --------- | ------- |
| `modelValue` | `boolean` | -       |
| `label`      | `string`  | -       |
| `disabled`   | `boolean` | -       |

### CSS Variables

| Variable           | Type      |
| ------------------ | --------- |
| `--checkbox-color` | `<color>` |