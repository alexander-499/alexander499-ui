<script setup lang="ts">
import { SearchField } from "@alexander499/ui";
</script>

# Search Field

A control that displays an editable text interface representing a search query.

<Demo>
  <SearchField/>
  <SearchField disabled/>
</Demo>

## API Reference

### Props

| Prop           | Type                                                | Default |
| -------------- | --------------------------------------------------- | ------- |
| `modelValue`   | `text`                                              | -       |
| `autocomplete` | `string`                                            | -       |
| `placeholder`  | `string`                                            | -       |
| `disabled`     | `boolean`                                           | -       |