<script setup lang="ts">
import { NumberField } from "@alexander499/ui";
</script>

# Number Field

A control that displays an editable number interface.

<Demo>
  <NumberField placeholder="Number"/>
  <NumberField placeholder="Number" disabled/>
</Demo>

## API Reference

### Props

| Prop           | Type      | Default |
| -------------- | --------- | ------- |
| `modelValue`   | `number`  | -       |
| `min`          | `number`  | `0`     |
| `max`          | `number`  | `100`   |
| `step`         | `number`  | `1`     |
| `autocomplete` | `string`  | -       |
| `placeholder`  | `string`  | -       |
| `disabled`     | `boolean` | -       |