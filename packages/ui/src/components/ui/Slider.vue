<script setup lang="ts">
import { computed } from "vue";
import Icon, { type IconType } from "@/components/ui/Icon.vue";
import { inverseLerp } from "@/utils";

const props = withDefaults(defineProps<{
  min?: number;
  max?: number;
  step?: number;
  ticks?: number | number[] | boolean;
  iconMin?: IconType;
  iconMax?: IconType;
  disabled?: boolean;
}>(), {
  min: 0,
  max: 100,
  step: 1
});

const model = defineModel<number>();

const progress = computed(() => inverseLerp(props.min, props.max, model.value ?? props.min));

const tickList = computed(() => {
  if (!props.ticks) return [];
  let values: number[] = [];
  if (Array.isArray(props.ticks)) values = props.ticks;
  else for (let v = props.min; v <= props.max; v += (typeof props.ticks === "number" ? props.ticks : props.step)) values.push(v);
  return values.map(value => ({ value, percentage: inverseLerp(props.min, props.max, value) }));
});
</script>

<template>
  <div class="slider">
    <Icon v-if="iconMin" class="icon-min" :name="iconMin"/>
    <input v-model.number="model" type="range" :min :max :step :disabled @dragstart.prevent>
    <Icon v-if="iconMax" class="icon-max" :name="iconMax"/>
    <div v-if="tickList.length" class="ticks">
      <div v-for="tick in tickList" :key="tick.value" class="tick" :style="{ '--slider-tick-percentage': tick.percentage }"/>
    </div>
  </div>
</template>

<style scoped>
.slider {
  width: 16rem;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:has(input:disabled) .icon { color: var(--color-text-tertiary); }
  &:has(.icon-min) .ticks { left: 3.1875rem; }
  &:has(.icon-max) .ticks { right: 3.1875rem; }

  input {
    flex: 1;
    appearance: none;
    background-color: transparent;
    border-radius: var(--border-radius-round);
    padding: 0.5625rem 0;
    cursor: pointer;
    --slider-color-primary: var(--slider-color, var(--color-accent-blue));
    --slider-color-secondary: var(--color-control);

    &:active:not(:disabled)::-webkit-slider-thumb { scale: 1.2; }

    &:disabled {
      cursor: not-allowed;

      &::-webkit-slider-runnable-track {
        --slider-color-primary: --color-disabled(var(--slider-color, var(--color-accent-blue)));
        --slider-color-secondary: --color-disabled(var(--color-control));
      }

      &::-webkit-slider-thumb { background-color: #aaa; }
    }

    &::-webkit-slider-runnable-track {
      height: 0.375rem;
      background-image: linear-gradient(
        to right,
        var(--slider-color-primary) 0%,
        var(--slider-color-primary) calc(v-bind(progress) * 100%),
        var(--slider-color-secondary) calc(v-bind(progress) * 100%),
        var(--slider-color-secondary) 100%
      );
      border-radius: var(--border-radius-round);
    }

    &::-webkit-slider-thumb {
      height: 1.5rem;
      width: 2.375rem;
      appearance: none;
      background-color: white;
      border-radius: var(--border-radius-round);
      margin-top: -0.5625rem;
      box-shadow: 0px 6px 12px 0px #0002;
      transition: scale 200ms;
    }
  }

  .ticks {
    height: 0.375rem;
    position: absolute;
    right: 1.1875rem;
    left: 1.1875rem;
    pointer-events: none;

    .tick {
      height: 0.25rem;
      width: 0.25rem;
      position: absolute;
      bottom: -0.5rem;
      left: calc(var(--slider-tick-percentage) * 100%);
      background-color: var(--color-control);
      border-radius: 50%;
      translate: -50%;
    }
  }

  .icon { color: var(--color-text-secondary); }
}
</style>