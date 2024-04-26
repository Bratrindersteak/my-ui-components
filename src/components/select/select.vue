<template>
  <div :class="classes">
    <div :class="`${toKebabCase(name)}-frame`" @click="handleClick">
      <template v-if="model">
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
import type { Size, Key, OptionData } from './type';

const name = 'mySelect';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel<Key | Key[]>();
const selectedData: ComputedRef<OptionData | OptionData[] | {}> = computed(() => {
  if (props.multiple) {
    return [];
    // return props.data.filter(({ value }) => model.value?.includes(value));
  } else {
    return props.data.find(({ value }) => value === model.value) || {};
  }
});

watch(model, (value) => {
  if (Array.isArray(value)) {
    model.value = [...new Set(value)];
  }
}, { immediate: true, once: true });

watch(model, (newValue, oldValue) => {
  console.log('select model change', { newValue, oldValue });
  emit('change', newValue);
});

function isOptionSelected(key: Key): boolean {
  if (Array.isArray(model.value)) {
    return model.value.includes(key);
  } else {
    return model.value === key;
  }
}

function handleSelect(key: Key) {
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
