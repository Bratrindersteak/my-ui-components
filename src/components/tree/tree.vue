<template>
  <div :class="classes"></div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";
import TreeNode from './tree-node.vue';

const name = 'myTree';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

type TreeData = {
  key: string;
  label: string;
  disabled: boolean;
  children: TreeData;
}

interface Props {
  data: Array<TreeData>;
  disabled?: boolean;
  draggable?: boolean;
  showCheckbox?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  draggable: false,
  showCheckbox: false,
});

const classes = computed(() => {
  const { disabled } = props;
  return [
    toKebabCase(name),
    disabled ? `${toKebabCase(name)}-disabled` : '',
  ];
});
const styles = computed(() => ({}));
</script>

<style lang="scss" src="./styles/index.scss"></style>
