<script setup lang="ts">
import { Slider } from "@alexander499/ui";
</script>

# Slider

A control for selecting a value from a bounded linear range of values.

<Demo column>
  <Slider :model-value="30"/>
  <Slider :model-value="80" :step="20" ticks/>
  <Slider :model-value="40" icon-min="a-arrow-down" icon-max="a-arrow-up"/>
  <Slider :model-value="70" :ticks="10" icon-min="turtle" icon-max="rabbit" disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type                            | Default |
| ------------ | ------------------------------- | ------- |
| `modelValue` | `number`                        | -       |
| `min`        | `number`                        | 0       |
| `max`        | `number`                        | 100     |
| `step`       | `number`                        | 1       |
| `ticks`      | `number \| number[] \| boolean` | -       |
| `iconMin`    | `IconType`                      | -       |
| `iconMax`    | `IconType`                      | -       |
| `disabled`   | `boolean`                       | -       |

### CSS Variables

| Variable         | Type      |
| ---------------- | --------- |
| `--slider-color` | `<color>` |