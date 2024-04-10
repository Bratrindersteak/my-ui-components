<template>
  <div :id="id" :class="classes">
    <span :class="`${toKebabCase(name)}-expand`" @click="handleExpand"><my-icon :type="expandIcon"></my-icon></span>
    <span :class="`${toKebabCase(name)}-checkbox`"></span>
    <span :class="`${toKebabCase(name)}-content`">{{ data.label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import MyIcon from '@/components/icon';
import type { TreeDataPlain } from './type';

const name = 'myTreeNode';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

interface Props {
  data: TreeDataPlain;
  disabled?: boolean;
  expandIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  expandIcon: 'caret-right',
});

const classes = computed(() => {
  return [
    toKebabCase(name),
    expanded.value ? `${toKebabCase(name)}-expanded` : '',
    props.data.display ? `${toKebabCase(name)}-display` : '',
  ];
});
const styles = computed(() => ({}));

const emit = defineEmits(['expand']);

const expanded = ref(props.data.expanded || false);

function handleExpand(event: Event) {
  expanded.value = !expanded.value;
  emit('expand', event, props.data, expanded.value);
}
</script>

<style lang="scss">
.my-tree-node {
  padding-left: calc(v-bind('data.level') * var(--my-tree-node-indent));
}
</style>
