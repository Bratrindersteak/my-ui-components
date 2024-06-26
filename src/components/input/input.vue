<template>
  <div :class="classes" :style="styles">
    <div v-if="$slots.prepend || prepend" :class="`${toKebabCase(name)}-prepend`">
      <slot v-if="$slots.prepend" name="prepend"></slot>
      <template v-else>{{ prepend }}</template>
    </div>
    <div :class="`${toKebabCase(name)}-main`">
      <div v-if="$slots.prefix || prefix" :class="`${toKebabCase(name)}-prefix`">
        <slot v-if="$slots.prefix" name="prefix"></slot>
        <my-icon v-else :type="prefix"></my-icon>
      </div>
      <input ref="input" :type="visible ? 'text' : type" :id="id" :class="`${toKebabCase(name)}-origin`"
             v-model="model" :disabled="disabled" :placeholder="placeholder"
             @keyup.enter="handlePressEnter" @focus="handleFocus" @blur="handleBlur"
      />
      <div v-if="$slots.suffix || suffix" :class="`${toKebabCase(name)}-suffix`">
        <slot v-if="$slots.suffix" name="suffix"></slot>
        <my-icon v-else :type="suffix"></my-icon>
      </div>
      <div v-if="clearable" v-show="showClearable" :class="`${toKebabCase(name)}-suffix ${toKebabCase(name)}-clearable`" @click="() => model = ''">
        <my-icon type="close-circle"></my-icon>
      </div>
      <div v-if="type === 'password'" v-show="showVisible" :class="`${toKebabCase(name)}-suffix  ${toKebabCase(name)}-visible`" @click="() => visible = !visible">
        <my-icon :type="visible ? 'eye' : 'hide'"></my-icon>
      </div>
    </div>
    <div v-if="$slots.append || append" :class="`${toKebabCase(name)}-append`">
      <slot v-if="$slots.append" name="append"></slot>
      <template v-else>{{ append }}</template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";
import MyIcon from '@/components/icon';

const name = 'myInput';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel<string | number>();
const visible = ref(false);

type Type = 'text' | 'textarea' | 'password' | 'button' | 'checkbox' | 'radio' | 'file' | 'number';
type Size = 'default' | 'large' | 'small';

interface Props {
  disabled?: boolean
  type?: Type
  size?: Size
  prepend?: any
  prefix?: any
  suffix?: any
  append?: any
  placeholder?: string
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'text',
  size: 'default',
  clearable: false,
});

const classes = computed(() => {
  const { type, disabled, size } = props;
  return [
    toKebabCase(name),
    `${toKebabCase(name)}-${type}`,
    disabled ? `${toKebabCase(name)}-disabled` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const styles = computed(() => ({}));

const showClearable = computed(() => props.clearable && model.value && !props.disabled);
const showVisible = computed(() => props.type === 'password' && model.value && !props.disabled);

const emit = defineEmits(['pressEnter', 'focus', 'blur']);

function handlePressEnter(event: Event) {
  emit('pressEnter', event);
}

function handleFocus(event: Event) {
  emit('focus', event);
}

function handleBlur(event: Event) {
  emit('blur', event);
}

interface Slots {
  prepend(): any
  prefix(): any
  suffix(): any
  append(): any
}

const slots = defineSlots<Slots>();

const input = ref<HTMLInputElement | null>(null);

function focus() {
  input.value?.focus();
}

function blur() {
  input.value?.blur();
}

defineExpose({
  ref: input,
  focus,
  blur,
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
