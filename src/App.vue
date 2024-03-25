<script setup lang="ts">
import { ref, watch } from 'vue';

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

const input2 = ref('');

watch(input2, (newValue, oldValue) => {
  console.log('input2', { newValue, oldValue });
});

function hangleCheckboxChange(event: Event) {
  console.log('hangleCheckboxChange', event.target.checked, event.target.value);
}

const checkbox1 = ref(true);

watch(checkbox1, (newValue, oldValue) => {
  console.log('checkbox1', { newValue, oldValue });
});

const checkbox2 = ref(true);

watch(checkbox2, (newValue, oldValue) => {
  console.log('checkbox2', { newValue, oldValue });
});
</script>

<template>
  <button>native button</button>
  <select name="" id="" @change="onSizeChange">
    <option value="large">Large</option>
    <option value="default" selected>Default</option>
    <option value="small">Small</option>
  </select>

  <Input type="password" prefix="user" placeholder="xPlease input1" suffix="search" size="large"></Input>
  <Input v-model="input2" prefix="user" placeholder="xPlease input2" suffix="search"></Input>
  <Input prefix="user" placeholder="xPlease input3" suffix="search" size="small">
    <template #suffix>
      <icon type="sun"></icon>
    </template>
  </Input>

  <Checkbox value="sun" size="small" @change="hangleCheckboxChange">checkbox</Checkbox>
  <Checkbox :checked="checkbox1" @change="hangleCheckboxChange">checkbox 1</Checkbox>
  <Checkbox v-model:checked="checkbox2" size="large" @change="hangleCheckboxChange">checkbox 2</Checkbox>
  <Checkbox disabled checked size="large" @change="hangleCheckboxChange">checkbox 3</Checkbox>

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
