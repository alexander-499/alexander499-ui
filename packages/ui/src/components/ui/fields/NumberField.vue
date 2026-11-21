<script setup lang="ts">
import Field from "@/components/ui/fields/Field.vue";

withDefaults(defineProps<{
  min?: number;
  max?: number;
  step?: number;
  autocomplete?: string;
  placeholder?: string;
  disabled?: boolean;
}>(), {
  min: 0,
  max: 100,
  step: 1
});

const model = defineModel<number>();
</script>

<template>
  <Field v-model.number="model" class="number-field" type="number" :autocomplete :placeholder :disabled>
    <template v-if="$slots.start" #start>
      <slot name="start"/>
    </template>
    <template v-if="$slots.end" #end>
      <slot name="end"/>
    </template>
  </Field>
</template>
