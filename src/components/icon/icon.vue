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
import Sun from '@/icons/sun.vue';

export default defineComponent({
  components: { Plus, Loading, Sun },
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

<style lang="scss">
.my-icon {
  display: inline-block;
  width: 1em;
  height: 1em;
}
</style>
