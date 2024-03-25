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
import Eye from '@/icons/eye.vue';
import Hide from '@/icons/hide.vue';
import Plus from '@/icons/plus.vue';
import Loading from '@/icons/loading.vue';
import Search from '@/icons/search.vue';
import Sun from '@/icons/sun.vue';
import User from '@/icons/user.vue';

export default defineComponent({
  components: { Eye, Hide, Plus, Loading, Search, Sun, User },
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
