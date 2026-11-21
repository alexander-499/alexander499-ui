<script setup lang="ts">
import { Button, NotificationGroup, useUI } from "@alexander499/ui";

const ui = useUI();
</script>

# Notification Group

<Demo>
  <Button @click="ui.notification.push('Info Notification', 'Notification Description.', 'info')">Info</Button>
  <Button @click="ui.notification.push('Success Notification', 'Notification Description.', 'success')">Success</Button>
  <Button @click="ui.notification.push('Warning Notification', 'Notification Description.', 'warning')">Warning</Button>
  <Button @click="ui.notification.push('Error Notification', 'Notification Description.', 'error')">Error</Button>
  <NotificationGroup/>
</Demo>

## API Reference

### Props

| Prop       | Type                                                                                              | Default          |
| ---------- | ------------------------------------------------------------------------------------------------- | ---------------- |
| `position` | `"top-left" \| "top-center" \| "top-right" \| "bottom-left" \| "bottom-center" \| "bottom-right"` | `"bottom-right"` |
| `duration` | `number`                                                                                          | `5000`           |