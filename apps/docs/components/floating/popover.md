<script setup lang="ts">
import { Button, Popover, useUI } from "@alexander499/ui";

const ui = useUI();
</script>

# Popover

<Demo>
  <Button @click="ui.popover.toggle('popover', $event)">Toggle Popover</Button>
  <Popover id="popover">Popover</Popover>
</Demo>

## API Reference

### Props

| Prop | Type     | Default |
| ---- | -------- | ------- |
| `id` | `string` | -       |