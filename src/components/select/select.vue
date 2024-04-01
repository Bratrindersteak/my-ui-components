<template>
  <div :class="classes" :style="styles">
    <div :class="`${toKebabCase(name)}-frame`"></div>
    <div :class="`${toKebabCase(name)}-options`"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";

const name = 'mySelect';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

type Size = 'default' | 'large' | 'small';

interface Props {
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
const styles = computed(() => ({}));
</script>

<style lang="scss" src="./styles/index.scss"></style>
