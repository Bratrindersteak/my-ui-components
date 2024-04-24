<template>
  <span :class="classes" @click="handleClick">
    <slot name="default"></slot>
    <span v-if="closeable" :class="`${toKebabCase(name)}-close`" @click="handleClose">
      <slot v-if="$slots.closeIcon" name="closeIcon"></slot>
      <icon v-else :type="closeIcon"></icon>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import Icon from '@/components/icon';
import type { Props } from './type';

const name = 'myTag';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
  type: 'default',
  closeable: false,
  closeIcon: 'close',
});

const classes = computed(() => {
  const { disabled, size, type } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
    type ? `${toKebabCase(name)}-${type}` : '',
  ];
});
const styles = computed(() => ({}));

const emit = defineEmits(['click', 'change', 'close']);

function handleClick(event: Event) {
  emit('click', event);
}

function handleClose(event: Event) {
  event.stopPropagation();
  emit('close', event);
}

interface Slots {
  default(): any
  closeIcon(): any
}

const slots = defineSlots<Slots>();
</script>

<style lang="scss" src="./styles/index.scss"></style>
