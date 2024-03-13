<template>

</template>

<script setup lang="ts">
import { toPascalCase } from "@/utils";

const name = 'myInput';

defineOptions({
  name: toPascalCase(name),
});

type Type = 'input' | 'textarea';
type Size = 'default' | 'large' | 'small';
interface Props {
  type?: Type
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  type: '',
  size: 'default',
});
</script>

