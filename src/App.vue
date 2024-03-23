<script setup lang="ts">
import { ref } from 'vue';

import './styles/index.scss';
import Button from './components/button/button.vue';
import Checkbox from './components/checkbox/checkbox.vue';
import Input from './components/input/input.vue';
import Icon from './components/icon/icon.vue';

const buttonSize = ref('default');

function onSizeChange(event: Event) {
  const { value } = event.target;

  buttonSize.value = value;
}

function hangleCheckboxChange(event: Event) {
  console.log('hangleCheckboxChange', event.target.checked, event.target.value);
}
</script>

<template>
  <button>native button</button>
  <select name="" id="" @change="onSizeChange">
    <option value="large">Large</option>
    <option value="default" selected>Default</option>
    <option value="small">Small</option>
  </select>
  <Input></Input>
  <Checkbox value="sun" size="small" @change="hangleCheckboxChange">checkbox</Checkbox>
  <Checkbox>checkbox 1</Checkbox>
  <Checkbox checked size="large">checkbox 2</Checkbox>
  <Checkbox disabled checked size="large">checkbox 3</Checkbox>
  <Button>my button</Button>
  <Button loading :size="buttonSize">Loading</Button>
  <Button icon="plus" size="default" loading>
    Loading and Icon
    <template #loading>
      <icon type="sun"></icon>
    </template>
  </Button>
  <Button type="primary" icon="loading" size="large" shape="round">我的按钮3</Button>
  <Button disabled size="small" shape="round">my button disabled 1</Button>
  <Button shape="circle" icon="plus"></Button>
  <Button shape="circle" icon="plus" size="large"></Button>
  <Button type="primary" shape="circle" icon="plus" size="small"></Button>
  <Button type="primary" disabled shape="circle">my button disabled 2</Button>
</template>

<style scoped>
button:not(:first-child) {
  margin-left: 8px;
}
</style>
