<script setup lang="ts">
import { ref, watch } from 'vue';

import './styles/index.scss';
import Button from './components/button/button.vue';
import Checkbox from './components/checkbox/checkbox.vue';
import Radio from './components/radio/radio.vue';
import Input from './components/input/input.vue';
import Icon from './components/icon/icon.vue';

const buttonSize = ref('default');

function onSizeChange(event: Event) {
  const { value } = event.target;

  buttonSize.value = value;
}

const input1 = ref('123456');
const input2 = ref('enna');
const input3 = ref('input3');

watch(input2, (newValue, oldValue) => {
  console.log('input2', { newValue, oldValue });
});

const refInput2 = ref(null);

watch(refInput2, (newValue, oldValue) => {
  console.log('refInput2', newValue);
  // newValue?.focus();
  // newValue?.ref?.focus();
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

  <div class="wrapper">
    <Input type="password" v-model="input1" prefix="user" placeholder="xPlease input1" suffix="search" size="large" clearable disabled>
      <template #prepend><icon type="sun"></icon>xPrepend</template>
      <template #prefix>
        <icon type="search"></icon>
      </template>
      <template #suffix>
        <icon type="sun"></icon>
      </template>
      <template #append>xAppend</template>
    </Input>
    <Input ref="refInput2" v-model="input2" disabled prefix="user" placeholder="xPlease input2" suffix="search" append=".com">
      <template #prepend><icon type="sun"></icon><span>xHttps://</span></template>
    </Input>
    <Input v-model="input3" prefix="user" placeholder="xPlease input3" suffix="search" size="small">
      <template #prepend><icon type="sun"></icon>xPrepend</template>
      <template #prefix>
        <icon type="search"></icon>
      </template>
      <template #suffix>
        <icon type="sun"></icon>
      </template>
      <template #append>xAppend</template>
    </Input>
  </div>

  <div class="wrapper">
    <Checkbox value="sun" size="small" @change="hangleCheckboxChange">checkbox</Checkbox>
    <Checkbox :checked="checkbox1" @change="hangleCheckboxChange">checkbox 1</Checkbox>
    <Checkbox v-model:checked="checkbox2" size="large" @change="hangleCheckboxChange">checkbox 2</Checkbox>
    <Checkbox disabled checked size="large" @change="hangleCheckboxChange">checkbox 3</Checkbox>
  </div>

  <div class="wrapper">
    <Radio size="small">radio1</Radio>
    <Radio>radio2</Radio>
    <Radio checked disabled size="large">radio3</Radio>
    <Radio disabled size="large">radio4</Radio>
  </div>

  <div class="wrapper">
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
  </div>
</template>

<style scoped>
button:not(:first-child) {
  margin-left: 8px;
}

.wrapper {
  margin: 8px;
}
</style>
