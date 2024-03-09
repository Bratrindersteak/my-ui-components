<template>
  <i :class="classes">
    <template v-if="type">
      <component :is="type" />
    </template>
    <template v-else>
      <slot name="default" />
    </template>
  </i>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Plus from '@/icons/plus.vue';
import Loading from '@/icons/loading.vue';

export default defineComponent({
  components: { Plus, Loading },
  name: 'MyIcon',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    classes() {
      return ['my-icon'];
    },
  },
});
</script>

<!--<script setup lang="ts">-->
<!--import { ref, computed } from 'vue';-->
<!--import Loading from '@/icons/loading.vue';-->

<!--defineOptions({-->
<!--  name: 'MyIcon',-->
<!--});-->

<!--type Type = 'loading';-->
<!--interface Props {-->
<!--  type?: string-->
<!--  color?: string-->
<!--  size?: number | string-->
<!--}-->

<!--const props = withDefaults(defineProps<Props>(), {-->
<!--  type: '',-->
<!--  color: 'inherit',-->
<!--});-->

<!--const icon = computed(() => `my-${props.type}`);-->
<!--const classes = computed(() => ['my-icon']);-->
<!--</script>-->

<style scoped lang="scss">
.my-icon {
  display: inline-block;
}
</style>
