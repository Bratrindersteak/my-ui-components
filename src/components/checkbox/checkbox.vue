<template>
  <label :for="id" :class="classes" :style="styles">
    <input type="checkbox" ref="checkbox" :id="id" :class="originalClass"
           :checked="checked" :disabled="disabled"
           @change="handleChange"/>
    <span :class="realClass"></span>
    <slot name="default"/>
  </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';

const name = 'myCheckbox';

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
  const { disabled, size } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const originalClass = `${toKebabCase(name)}-original`;
const realClass = `${toKebabCase(name)}-real`;
const styles = computed(() => ({}));

const emit = defineEmits(['change']);

function handleChange(event: Event) {
  if (props.disabled) {
    event.preventDefault();
    return;
  }

  emit('change', event);
}

const checkbox = ref<HTMLInputElement>();
</script>

<style lang="scss" src="./styles/index.scss"></style>
