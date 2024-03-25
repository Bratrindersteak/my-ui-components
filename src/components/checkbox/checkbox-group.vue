<template>
  <div :class="classes"></div>
</template>

<script setup lang="ts">
import { genId, toKebabCase, toPascalCase } from '@/utils';
import { computed } from 'vue';

const name = 'myCheckboxGroup';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

type Size = 'default' | 'large' | 'small';

interface Props {
  disabled?: boolean
  checked?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  checked: false,
  size: 'default',
});

const classes = computed(() => {
  const { checked, disabled, size } = props;
  return [
    toKebabCase(name),
    checked ? `${toKebabCase(name)}-checked` : '',
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
</script>

<style lang="scss"></style>
