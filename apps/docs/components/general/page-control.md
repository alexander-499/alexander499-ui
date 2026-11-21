<script setup lang="ts">
import { PageControl } from "@alexander499/ui";
</script>

# Page Control

<Demo>
  <PageControl :model-value="0" :pages="5"/>
  <PageControl :model-value="2" :pages="3" disabled/>
</Demo>

## API Reference

### Props

| Prop         | Type      | Default |
| ------------ | --------- | ------- |
| `modelValue` | `number`  | -       |
| `pages`      | `number`  | -       |
| `disabled`   | `boolean` | -       |