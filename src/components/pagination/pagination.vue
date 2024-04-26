<template>
  <div ref="pagination" :id="id" :class="classes" :style="styles">
    <ul :class="`${toKebabCase(name)}-list`">
      <li :class="prevClasses" @click="handlePrevClick">
        <slot v-if="$slots.prev" name="prev"></slot>
        <icon v-else type="arrowhead-left"></icon>
      </li>
      <template v-for="page in totalPages" :key="page">
        <li :class="[`${toKebabCase(name)}-item`, page === currentPage ? `${toKebabCase(name)}-item-active` : '', disabled ? `${toKebabCase(name)}-item-disabled` : '',]" @click="handlePageClick(page)">{{ page }}</li>
      </template>
      <li :class="nextClasses" @click="handleNextClick">
        <slot v-if="$slots.next" name="next"></slot>
        <icon v-else type="arrowhead-right"></icon>
      </li>
    </ul>
    <div>跳至 <Input type="number" v-model="jumper" :size="size" :style="{ width: '50px' }" @press-enter="handleJump"></Input> 页</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from '@/utils';
import Icon from '@/components/icon';
import Select from '@/components/select';
import Input from '@/components/input';
import type { Props, Slots } from './type';

const name = 'myPagination';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'default',
  size: 'default',
  defaultCurrentPage: 1,
  defaultPageSize: 10,
  total: 0,
});

const jumper = ref(props.currentPage || props.defaultCurrentPage);

const totalPages = computed(() => {
  const { pageSize, defaultPageSize, total } = props;
  if (total > 0) {
    return Math.ceil(total / (pageSize || defaultPageSize));
  } else {
    return 0;
  }
});

const classes = computed(() => {
  const { type, size } = props;
  return [
    toKebabCase(name),
    type !== 'default' ? `${toKebabCase(name)}-${type}` : '',
    size !== 'default' ? `${toKebabCase(name)}-${size}` : '',
  ];
});
const prevClasses = computed(() => {
  const { disabled, currentPage } = props;
  return [
    `${toKebabCase(name)}-item`,
    `${toKebabCase(name)}-item-prev`,
    (currentPage === 1 || disabled) ? `${toKebabCase(name)}-item-disabled` : ''];
});
const nextClasses = computed(() => {
  const { disabled, currentPage, total } = props;
  return [
    `${toKebabCase(name)}-item`,
    `${toKebabCase(name)}-item-next`,
    (currentPage === totalPages.value || disabled) ? `${toKebabCase(name)}-item-disabled` : ''];
});
const styles = computed(() => ({}));

const emit = defineEmits(['update:currentPage', 'currentChange', 'update:pageSize', 'sizeChange']);

function handlePrevClick() {
  const { currentPage } = props;

  if (!currentPage || currentPage <= 1) {
    return;
  }

  jumper.value = currentPage - 1;
  emit('update:currentPage', currentPage - 1);
  emit('currentChange', currentPage - 1);
}

function handlePageClick(page: number) {
  if (page === props.currentPage) {
    return;
  }

  jumper.value = page;
  emit('update:currentPage', page);
  emit('currentChange', page);
}

function handleNextClick() {
  const { currentPage } = props;

  if (!currentPage || currentPage >= totalPages.value) {
    return;
  }

  jumper.value = currentPage + 1;
  emit('update:currentPage', currentPage + 1);
  emit('currentChange', currentPage + 1);
}

function handleJump() {
  if (!Number.isSafeInteger(jumper.value) || jumper.value < 1 || jumper.value > totalPages.value) {
    return;
  }

  emit('update:currentPage', jumper.value);
  emit('currentChange', jumper.value);
}

const slots = defineSlots<Slots>();

const pagination = ref<HTMLDivElement>();

defineExpose({
  ref: pagination,
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
