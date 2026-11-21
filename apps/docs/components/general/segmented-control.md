<script setup lang="ts">
import { SegmentedControl } from "@alexander499/ui";
</script>

# Segmented Control

A control that is a linear set of two or more segments, each of which functions as a button.

<Demo column>
  <SegmentedControl model-value="segmented" :options="[
    { value: 'segmented', label: 'Segmented' },
    { value: 'control', label: 'Control' }
  ]"/>
  <SegmentedControl model-value="segmented" :options="[
    { value: 'segmented', label: 'Segmented' },
    { value: 'control', label: 'Control' }
  ]" disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type                                                       | Default |
| ------------ | ---------------------------------------------------------- | ------- |
| `modelValue` | `string \| number \| boolean`                              | -       |
| `options`    | `{ value: string \| number \| boolean; label: string; }[]` | -       |
| `disabled`   | `boolean`                                                  | -       |