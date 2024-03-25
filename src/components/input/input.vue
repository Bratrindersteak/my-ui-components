<template>
  <div :id="id" :class="classes" :style="styles">
    <div v-if="$slots.prepend" :class="`${toKebabCase(name)}-prepend`">
      <slot name="prepend"></slot>
    </div>
    <div :class="`${toKebabCase(name)}-main`">
      <div v-if="$slots.prefix || prefix" :class="`${toKebabCase(name)}-prefix`">
        <slot v-if="$slots.prefix" name="prefix"></slot>
        <my-icon v-else :type="prefix"></my-icon>
      </div>
      <input ref="input" :type="type" :class="`${toKebabCase(name)}-origin`"
             v-model="model" :disabled="disabled" :placeholder="placeholder"
      />
      <div v-if="$slots.suffix || suffix || type === 'password'" :class="`${toKebabCase(name)}-suffix`">
        <slot v-if="$slots.suffix" name="suffix"></slot>
        <my-icon v-else :type="suffix"></my-icon>
        <my-icon v-if="type === 'password'" :type="visible ? 'eye' : 'hide'" @click="handleVisibleChange"></my-icon>
      </div>
    </div>
    <div v-if="$slots.append" :class="`${toKebabCase(name)}-append`">
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";
import MyIcon from '@/components/icon';

const name = 'myInput';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel<string>();
const visible = ref(false);
function handleVisibleChange() {
  if (visible.value) {
    
  } else {

  }

  visible.value = !visible.value;
}

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
  const { type, disabled, size } = props;
  return [
    toKebabCase(name),
    `${toKebabCase(name)}-${type}`,
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
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
