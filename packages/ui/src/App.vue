<script setup lang="ts">
import { useUI } from "@/composables/useUI";

const ui = useUI();
</script>

<template>
  <main>
    <h1>@alexander499/ui</h1>
    <h2>Buttons</h2>
    <p>A control that initiates an action.</p>
    <Button appearance="text" size="small">Text Small</Button>
    <Button appearance="text" size="medium">Text Medium</Button>
    <Button appearance="bordered" size="small">Bordered Small</Button>
    <Button appearance="bordered" size="medium"><Icon name="play"/>Bordered Medium</Button>
    <Button appearance="filled" size="small">Filled Small</Button>
    <Button appearance="filled" size="medium">Filled Medium</Button>
    <h2>Text Fields</h2>
    <p>A control that displays an editable text interface.</p>
    <TextField type="text" placeholder="Text"/>
    <TextField type="number" placeholder="Number"/>
    <h2>Search Fields</h2>
    <p>A control that displays an editable text interface representing a search query.</p>
    <SearchField/>
    <h2>Sliders</h2>
    <p>A control for selecting a value from a bounded linear range of values.</p>
    <Slider/>
    <Slider :step="20" :ticks="true"/>
    <Slider icon-min="a-arrow-down" icon-max="a-arrow-up"/>
    <h2>Toggles</h2>
    <p>A control that toggles between on and off states.</p>
    <Toggle/>
    <h2>Segmented Control</h2>
    <p>A control that is a linear set of two or more segments, each of which functions as a button.</p>
    <SegmentedControl :options="[
      { value: 'hello', label: 'Hello' },
      { value: 'world', label: 'World' }
    ]"/>
    <h2>Stepper</h2>
    <Stepper/>
    <h2>Page Controls</h2>
    <PageControl :pages="5"/>
    <h2>Icons</h2>
    <Icon name="home"/>
    <Icon name="settings"/>
    <Icon name="menu"/>
    <h2>Dialogs</h2>
    <Button @click="ui.dialog.open('hello-dialog')">Open Dialog</Button>
    <Dialog id="helloDialog" title="Dialog">Hello</Dialog>
    <h2>Popovers</h2>
    <Button @click="ui.popover.toggle('hello-popover', $event)">Toggle Popover</Button>
    <Popover id="helloPopover">Hello</Popover>
  </main>
</template>