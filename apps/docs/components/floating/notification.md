<script setup lang="ts">
import { Notification } from "@alexander499/ui";
</script>

# Notification

<Demo column>
  <Notification type="info" title="Notification" message="Info."/>
  <Notification type="success" title="Notification" message="Success."/>
  <Notification type="warning" title="Notification" message="Warning."/>
  <Notification type="error" title="Notification" message="Error."/>
</Demo>

## API Reference

### Props

| Prop       | Type                                          | Default  |
| ---------- | --------------------------------------------- | -------- |
| `title`    | `string`                                      | -        |
| `message`  | `string`                                      | -        |
| `type`     | `"info" \| "success" \| "warning" \| "error"` | `"info"` |
| `duration` | `number`                                      | `5000`   |