<script setup lang="ts">
import { Stepper } from "@alexander499/ui";
</script>

# Stepper

<Demo>
  <Stepper/>
  <Stepper disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type      | Default |
| ------------ | --------- | ------- |
| `modelValue` | `number`  | -       |
| `min`        | `number`  | 0       |
| `max`        | `number`  | 100     |
| `step`       | `number`  | 1       |
| `disabled`   | `boolean` | -       |