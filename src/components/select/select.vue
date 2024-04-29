<template>
  <div :id="id" :class="classes">
    <div :class="`${toKebabCase(name)}-frame`" @click="handleClick">
      <template v-if="modelValue">
        <template v-if="multiple">
          <tag v-for="selectedItem in selectedData" :key="selectedItem.value" closeable :size="size" @click="handleTagClick(selectedItem.value)" @close="handleTagClose(selectedItem.value)">{{ selectedItem.label }}</tag>
        </template>
        <template v-else>{{ selectedData.label }}</template>
      </template>
      <span v-else :class="`${toKebabCase(name)}-placeholder`">{{ placeholder }}</span>
    </div>
    <ul :class="`${toKebabCase(name)}-options`" :style="{ display: folded ? 'none' : 'block' }">
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
import Tag from '@/components/tag';
import type { ComputedRef } from 'vue';
import type { Key, OptionData, Props } from './type';

const name = 'mySelect';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const selectedData: ComputedRef<OptionData | OptionData[] | {}> = computed(() => {
  if (props.multiple) {
    return [];
  } else {
    return props.data.find(({ value }) => value === props.modelValue) || {};
  }
});

function isOptionSelected(key: Key): boolean {
  const { multiple, modelValue } = props;
  if (multiple) {
    return Array.isArray(modelValue) ? modelValue.includes(key) : false;
  } else {
    return modelValue === key;
  }
}

function handleSelect(key: Key) {
  const { multiple, modelValue } = props;
  if (multiple) {
    const multipleValue = Array.isArray(modelValue) ? [...new Set(modelValue)] : [];
    const targetIndex = multipleValue.findIndex(i => i === key);
    if (targetIndex !== -1) {
      multipleValue.splice(targetIndex, 1)
    } else {
      multipleValue.push(key);
    }

    emit('update:modelValue', multipleValue);
    emit('change', multipleValue);
  } else {
    emit('update:modelValue', key);
    emit('change', key);
  }
}

function handleClick() {
  folded.value = !folded.value;
}

function handleTagClick(key: Key) {
  console.log('<select>', 'handleTagClick', '点击这个标签', key);
}

function handleTagClose(key: Key) {
  console.log('<select>', 'handleTagClose', '反选这个标签', key);
}

function handleClear(event: Event) {
  console.log('<select>', 'handleClear', '清空选项');
  emit('update:modelValue', props.multiple ? [] : undefined);
  emit('change', props.multiple ? [] : undefined);
  emit('clear', event);
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  multiple: false,
  clearable: false,
  disabled: false,
  size: 'default',
  placeholder: '请选择',
});

const classes = computed(() => {
  const { disabled, size } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});

const folded = ref(true);
const styles = computed(() => {
  return {
    display: '',
  };
});

const emit = defineEmits(['update:modelValue', 'change', 'clear']);
</script>

<style lang="scss" src="./styles/index.scss"></style>
