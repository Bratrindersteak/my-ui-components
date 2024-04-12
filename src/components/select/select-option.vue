<template>
  <li :class="classes" @click="handleClick">{{ data.label }}</li>
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
  selected?: boolean
  disabled?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
});

const classes = computed(() => {
  const { selected, disabled, size } = props;
  return [
    toKebabCase(name),
    selected ? `${toKebabCase(name)}-selected` : '',
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});

const emit = defineEmits(['select']);

function handleClick() {
  emit('select', props.data.value);
}
</script>
