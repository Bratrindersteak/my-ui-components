<template>
  <div :class="classes">
    <div :class="`${toKebabCase(name)}-frame`" @click="handleClick">
      <template v-if="model">
        <tag v-if="multiple" closeable :size="size" @click="handleTagClick(selected.value)" @close="handleTagClose(selected.value)">{{ selected.label }}</tag>
        <template v-else>{{ selected.label }}</template>
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
import type { Size, Key, OptionData } from './type';

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

function handleClick() {
  folded.value = !folded.value;
}

function handleTagClick(key: Key) {
  console.log('<select>', 'handleTagClick', '点击这个标签', key);
}

function handleTagClose(key: Key) {
  console.log('<select>', 'handleTagClose', '反选这个标签', key);
}

function handleClear() {
  console.log('<select>', 'handleClear', '清空选项');
}

interface Props {
  data?: Array<OptionData>
  multiple?: boolean
  clearable?: boolean
  disabled?: boolean
  size?: Size
  placeholder?: string
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

const emit = defineEmits(['change']);
</script>

<style lang="scss" src="./styles/index.scss"></style>
