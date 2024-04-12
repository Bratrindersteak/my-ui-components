<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";

const name = 'myTag';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
