<script setup lang="ts">
import { TextField, Icon } from "@alexander499/ui";
</script>

# Text Field

A control that displays an editable text interface.

<Demo>
  <TextField type="text" placeholder="Text"/>
  <TextField type="text" placeholder="Text" disabled/>
</Demo>

<Demo>
  <TextField type="email" placeholder="Email"/>
  <TextField type="password" placeholder="Password"/>
  <TextField type="tel" placeholder="Tel"/>
  <TextField type="url" placeholder="URL"/>
</Demo>

## API Reference

### Props

| Prop           | Type                                                | Default |
| -------------- | --------------------------------------------------- | ------- |
| `modelValue`   | `text`                                              | -       |
| `type`         | `"text" \| "email" \| "password" \| "tel" \| "url"` | -       |
| `autocomplete` | `string`                                            | -       |
| `placeholder`  | `string`                                            | -       |
| `disabled`     | `boolean`                                           | -       |