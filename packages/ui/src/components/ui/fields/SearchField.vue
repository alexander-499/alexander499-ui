<script setup lang="ts">
import Field from "@/components/ui/fields/Field.vue";
import Button from "@/components/ui/Button.vue";
import Icon from "@/components/ui/Icon.vue";

withDefaults(defineProps<{
  autocomplete?: string;
  placeholder?: string;
  disabled?: boolean;
}>(), {
  placeholder: "Search"
});

const model = defineModel<string>();
</script>

<template>
  <Field v-model="model" class="search-field" type="search" :autocomplete :placeholder :disabled>
    <template #start>
      <Icon name="search"/>
      <slot name="start"/>
    </template>
    <template #end>
      <Button v-show="model" class="cancel-button" appearance="text" size="small" :disabled @click="model = ''"><Icon name="x"/></Button>
      <slot name="end"/>
    </template>
  </Field>
</template>