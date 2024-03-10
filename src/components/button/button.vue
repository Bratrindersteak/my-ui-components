<template>
  <component :is="tag" ref="button"
    :class="classes" :style="styles"
    @click="handleClick"
  >
    <template v-if="icon">
      <slot v-if="$slots.icon" name="icon"></slot>
      <my-icon v-else :type="icon" />
    </template>
    <template v-else-if="loading">
      <slot v-if="$slots.loading" name="loading"></slot>
      <my-icon v-else type="loading" />
    </template>
    <span v-if="$slots.default" class="text">
      <slot name="default"/>
    </span>
  </component>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { toPascalCase, toCamelCase, toKebabCase } from '@/utils';
import MyIcon from '@/components/icon';

const name = 'myButton';

defineOptions({
  name: toPascalCase(name),
});

type Type = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
type Size = 'default' | 'large' | 'small';
interface Props {
  type?: Type
  disabled?: boolean
  icon?: string
  loading?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  disabled: false,
  loading: false,
  size: 'default',
});

const tag = computed(() => 'button');
const classes = computed(() => {
  const { size } = props;

  console.log({ name });

  return ['my-button',
    { primary: props.type === 'primary' },
    { loading: props.loading },
    { disabled: props.disabled },
    { 'my-button-large': size === 'large' },
    { 'my-button-small': size === 'small' },
  ];
});
const styles = computed(() => ({}));

const emit = defineEmits(['click']);

function handleClick(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  console.log('my-button', 'click');

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
  focus,
  blur,
});
</script>

<style scoped lang="scss" src="./styles/index.scss"></style>
