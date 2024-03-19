<template>
  <div class="my-input-wrapper">
    <div class="my-input-prefix">
      <slot name="prefix"></slot>
    </div>
    <input :type="type" ref="input" :class="classes" :style="styles"/>
    <div class="my-input-suffix">
      <slot name="prefix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toKebabCase, toPascalCase } from "@/utils";
import { computed, ref } from 'vue';

const name = 'myInput';

defineOptions({
  name: toPascalCase(name),
});

type Type = 'text' | 'textarea' | 'password' | 'button' | 'checkbox' | 'radio' | 'file' | 'number';
type Size = 'default' | 'large' | 'small';

interface Props {
  disabled?: boolean
  type?: Type
  size?: Size
  prepend?: any
  prefix?: any
  suffix?: any
  append?: any
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'text',
  size: 'default',
});

const classes = computed(() => {
  const { type } = props;
  return [toKebabCase(name), `${toKebabCase(name)}-${type}`];
});
const styles = computed(() => ({}));

interface Slots {
  prepend(): any
  prefix(): any
  suffix(): any
  append(): any
}

const slots = defineSlots<Slots>();

const input = ref<HTMLInputElement>();

function focus() {
  input.value!.focus();
}

function blur() {
  input.value!.blur();
}

defineExpose({
  ref: input,
  focus,
  blur,
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
