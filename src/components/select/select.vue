<template>
  <div :class="classes" :style="styles">
    <div :class="`${toKebabCase(name)}-frame`">{{ selected.label }}</div>
    <ul :class="`${toKebabCase(name)}-options`">
      <template v-for="item in data" :key="item.value">
        <select-option :data="item" :selected="isOptionSelected(item.value)" :disabled="disabled" :size="size" @select="handleSelect"></select-option>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import SelectOption from './select-option.vue';
import type { ComputedRef } from 'vue';
import type { Size, OptionData } from './type';

const name = 'mySelect';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel<string|number|boolean|Array<any>>();

watch(model, (value) => {
  if (Array.isArray(value)) {
    model.value = [...new Set(value)];
  }
}, { immediate: true, once: true });

watch(model, (newValue, oldValue) => {
  console.log('select model change', { newValue, oldValue });
  emit('change', newValue);
});

const selected: ComputedRef<OptionData | {}> = computed(() => props.data.find(({ value }) => value === model.value) || {});

function isOptionSelected(key: string | number): boolean {
  if (Array.isArray(model.value)) {
    return model.value.includes(key);
  } else {
    return model.value === key;
  }
}

function handleSelect(key: string | number) {
  if (Array.isArray(model.value)) {
    const targetIndex = model.value.findIndex(i => i === key);

    if (targetIndex !== -1) {
      model.value.splice(targetIndex, 1);
    }
  } else {
    model.value = key;
  }
}

interface Props {
  data?: Array<OptionData>
  multiple?: boolean
  disabled?: boolean
  size?: Size
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  multiple: false,
  disabled: false,
  size: 'default',
  placeholder: '',
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

const emit = defineEmits(['change']);
</script>

<style lang="scss" src="./styles/index.scss"></style>
