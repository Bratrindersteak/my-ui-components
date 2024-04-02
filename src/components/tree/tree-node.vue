<template>
  <div :id="id" :class="classes"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';

const name = 'myTreeNode';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const classes = computed(() => {
  return [
    toKebabCase(name),
  ];
});
const styles = computed(() => ({}));
</script>
