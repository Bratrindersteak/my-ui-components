<template>
  <div :class="classes" :style="styles" @click="handleClick">
    <span :class="`${toKebabCase(name)}-text`">{{ model ? onText : offText }}</span>
    <span :class="`${toKebabCase(name)}-ball`">
      <template v-if="loading">
        <slot v-if="$slots.loadingIcon" name="loadingIcon"></slot>
        <icon v-else :type="loadingIcon || 'loading'"></icon>
      </template>
      <template v-else-if="model">
        <slot v-if="$slots.onIcon" name="onIcon"></slot>
        <icon v-else-if="onIcon" :type="onIcon"></icon>
      </template>
      <template v-else-if="!model">
        <slot v-if="$slots.offIcon" name="offIcon"></slot>
        <icon v-else-if="offIcon" :type="offIcon"></icon>
      </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import Icon from '@/components/icon';

const name = 'mySwitch';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const model = defineModel<boolean>();

type Size = 'default' | 'large' | 'small';

interface Props {
  disabled?: boolean
  loading?: boolean
  loadingIcon?: string
  onIcon?: string
  offIcon?: string
  checked?: boolean
  size?: Size
  onText?: string
  offText?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  loading: false,
  checked: false,
  size: 'default',
});

const classes = computed(() => {
  const { checked, disabled, loading, size } = props;
  return [
    toKebabCase(name),
    model.value ? `${toKebabCase(name)}-on`: `${toKebabCase(name)}-off`,
    disabled ? `${toKebabCase(name)}-disabled` : '',
    loading ? `${toKebabCase(name)}-loading` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const styles = computed(() => ({}));

const emit = defineEmits(['change']);

function handleClick(event: Event) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  const newValue = !model.value;

  model.value = newValue;
  emit('change', newValue);
}

interface Slots {
  loadingIcon(): any
  onIcon(): any
  offIcon(): any
}

const slots = defineSlots<Slots>();
</script>

<style lang="scss" src="./styles/index.scss"></style>
