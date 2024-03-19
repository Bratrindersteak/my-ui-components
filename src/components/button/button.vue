<template>
  <component :is="tag" ref="button" :id="id"
    :class="classes" :style="styles"
    @click="handleClick"
  >
    <template v-if="$slots.loading">
      <slot name="loading"></slot>
    </template>
    <template v-else-if="loading">
      <my-icon type="loading" />
    </template>
    <template v-else-if="$slots.icon">
      <slot name="icon"></slot>
    </template>
    <template v-else-if="icon">
      <my-icon :type="icon" />
    </template>
    <span v-if="$slots.default" class="text">
      <slot name="default"/>
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { genId, toPascalCase, toKebabCase } from '@/utils';
import MyIcon from '@/components/icon';

const name = 'myButton';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

type Type = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type Shape = 'default' | 'round' | 'circle';
type Size = 'default' | 'large' | 'small';
interface Props {
  type?: Type
  shape?: Shape
  disabled?: boolean
  icon?: string
  loading?: boolean
  block?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  shape: 'default',
  disabled: false,
  loading: false,
  block: false,
  size: 'default',
});

const tag = computed(() => 'button');
const classes = computed(() => {
  const { disabled, loading, block, type, shape, size } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
    loading ? `${toKebabCase(name)}-loading` : '',
    block ? `${toKebabCase(name)}-block` : '',
    `${toKebabCase(name)}-${type}`,
    shape !== 'default' ? `${toKebabCase(name)}-${shape}` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const styles = computed(() => ({}));

const emit = defineEmits(['click']);

function handleClick(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  emit('click', event);
}

interface Slots {
  default(): any
  icon(): any
  loading(): any
}

const slots = defineSlots<Slots>();

const button = ref<HTMLButtonElement>();

function focus() {
  button.value!.focus();
}

function blur() {
  button.value!.blur();
}

defineExpose({
  ref: button,
  focus,
  blur,
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
