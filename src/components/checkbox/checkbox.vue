<template>
  <label ref="label" :for="id" :class="classes" :style="styles">
    <input type="checkbox" ref="checkbox" :id="id" :class="classOriginal"
           v-model="model" :disabled="disabled"
           @click="handleClick" @change="handleChange"/>
    <span :class="classCurrent"></span>
    <span :class="`${toKebabCase(name)}-text`" v-if="$slots.default">
      <slot name="default"/>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';

const name = 'myCheckbox';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel('checked', { type: Boolean });

type Size = 'default' | 'large' | 'small';

interface Props {
  disabled?: boolean
  checked?: boolean
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  checked: false,
  size: 'default',
});

watch(() => props.checked, (checked) => {
  model.value = checked;
}, { immediate: true, once: true });

const classes = computed(() => {
  const { checked, disabled, size } = props;
  return [
    toKebabCase(name),
    checked ? `${toKebabCase(name)}-checked` : '',
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const classOriginal = `${toKebabCase(name)}-original`;
const classCurrent = `${toKebabCase(name)}-current`;
const styles = computed(() => ({}));

const emit = defineEmits(['change']);

interface Slots {
  default(): any
}

const slots = defineSlots<Slots>();

function handleChange(event: Event) {
  emit('change', event);
}

const checkbox = ref<HTMLInputElement>();
const label = ref<HTMLLabelElement>();

function handleClick() {
  label.value?.classList.toggle(`${toKebabCase(name)}-checked`);
}
</script>

<style lang="scss" src="./styles/index.scss"></style>
