<script setup lang="ts">
import Field from "@/components/ui/fields/Field.vue";

defineProps<{
  type?: "text" | "email" | "password" | "tel" | "url";
  autocomplete?: string;
  placeholder?: string;
  disabled?: boolean;
}>();

const model = defineModel<string>();
</script>

<template>
  <Field v-model="model" class="text-field" :type :autocomplete :placeholder :disabled>
    <template v-if="$slots.start" #start>
      <slot name="start"/>
    </template>
    <template v-if="$slots.end" #end>
      <slot name="end"/>
    </template>
  </Field>
</template>