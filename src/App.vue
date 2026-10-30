<script setup lang="ts">
import Button from "@/components/Button.vue";
import TextField from "@/components/TextField.vue";
import SearchField from "@/components/SearchField.vue";
import Icon from "@/components/Icon.vue";
</script>

<template>
  <main>
    <h1>@alexander499/ui</h1>
    <h2>Buttons</h2>
    <Button appearance="text" size="small">Text Small</Button>
    <Button appearance="text" size="medium">Text Medium</Button>
    <Button appearance="bordered" size="small">Bordered Small</Button>
    <Button appearance="bordered" size="medium">Bordered Medium</Button>
    <Button appearance="filled" size="small">Filled Small</Button>
    <Button appearance="filled" size="medium">Filled Medium</Button>
    <h2>Text Fields</h2>
    <TextField type="text" placeholder="Text"/>
    <TextField type="number" placeholder="Number"/>
    <h2>Search Fields</h2>
    <SearchField type="search"/>
    <h2>Icons</h2>
    <Icon name="home"/>
    <Icon name="settings"/>
    <Icon name="menu"/>
  </main>
</template>

<style scoped>
main {
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 1rem auto;
  padding-inline: 1rem;

  h1 { align-self: center; }
}
</style>