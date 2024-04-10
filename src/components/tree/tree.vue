<template>
  <div :class="classes">
    <tree-node v-for="item in plainData" :key="item.key" :data="item" @expand="handleExpand"></tree-node>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import type { TreeData, TreeDataPlain } from './type';
import TreeNode from './tree-node.vue';

const name = 'myTree';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

interface Props {
  data: Array<TreeData>;
  disabled?: boolean;
  draggable?: boolean;
  showCheckbox?: boolean;
  expandedKeys?: Array<string>;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  draggable: false,
  showCheckbox: false,
  expandedKeys: () => [],
});

const plainData = computed(() => {
  const newData: Array<TreeDataPlain> = [];
  let index = 0;
  (function _(data, level) {
    data.forEach(({ children, key, ...res }) => {
      const newItem: TreeDataPlain = { key, ...res, index, level };
      if (_expandedKeys.has(key)) {
        newItem.expanded = true;
      }
      if (displayKeys.has(key)) {
        newItem.display = true;
      }
      newData.push(newItem);
      index += 1;
      if (children) {
        _(children, level + 1);
      }
    });
  })(props.data, 0);

  return newData;
});

const _expandedKeys = reactive(new Set());

const displayKeys = reactive(new Set(props.data[0].key));
watch(displayKeys, (value) => {
  console.log('watch', 'displayKeys', value);
}, { immediate: true });

const classes = computed(() => {
  const { disabled } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
  ];
});
const styles = computed(() => ({}));

function handleExpand(event: Event, data: TreeDataPlain, expanded: boolean) {
  const { key, index, level } = data;

  if (_expandedKeys.has(key)) {
    _expandedKeys.delete(key);
  } else {
    _expandedKeys.add(key);
  }

  if (expanded) {
    for (let i = index + 1; i < plainData.value.length; i += 1) {
      if (plainData.value[i].level === level + 1) {
        console.log('true', plainData.value[i].level, level + 1);
        displayKeys.add(plainData.value[i].key);
      }
      if (plainData.value[i].level === level) {
        break;
      }
    }

  } else {
    for (let i = index + 1; i < plainData.value.length; i += 1) {
      if (plainData.value[i].level > level) {
        displayKeys.delete(plainData.value[i].key);
      } else {
        break;
      }
    }
  }

  console.log('my-tree', 'handleExpand', expanded, { key, index, level });
}
</script>

<style lang="scss" src="./styles/index.scss"></style>
