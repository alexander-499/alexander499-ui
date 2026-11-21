<script setup lang="ts">
import { Button, Dialog, useUI } from "@alexander499/ui";

const ui = useUI();
</script>

# Dialog

<Demo>
  <Button @click="ui.dialog.open('dialog')">Open Dialog</Button>
  <Dialog id="dialog" title="Dialog">Content</Dialog>
</Demo>

## API Reference

### Props

| Prop    | Type     | Default |
| ------- | -------- | ------- |
| `id`    | `string` | -       |
| `title` | `string` | -       |