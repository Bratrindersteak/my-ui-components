<template>
  <li :class="classes">{{ data.label }}</li>
</template>

<script setup lang="ts">
import { genId, toKebabCase, toPascalCase } from '@/utils';
import type { Size, OptionData } from './type';
import { computed } from 'vue';

const name = 'mySelectOption';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

interface Props {
  data: OptionData
  disabled?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
});

const classes = computed(() => {
  const { disabled, size } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
</script>
