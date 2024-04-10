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
import ArrowheadRight from '@/icons/arrowhead-right.vue';
import CaretRight from '@/icons/caret-right.vue';
import Check from '@/icons/check.vue';
import Close from '@/icons/close.vue';
import CloseCircle from '@/icons/close-circle.vue';
import CloseCircleFilled from '@/icons/close-circle-filled.vue';
import Eye from '@/icons/eye.vue';
import Folder from '@/icons/folder.vue';
import FolderOpened from '@/icons/folder-opened.vue';
import Hide from '@/icons/hide.vue';
import Moon from '@/icons/moon.vue';
import Plus from '@/icons/plus.vue';
import Loading from '@/icons/loading.vue';
import Search from '@/icons/search.vue';
import Sun from '@/icons/sun.vue';
import User from '@/icons/user.vue';

export default defineComponent({
  components: { ArrowheadRight, CaretRight, Check, Close, CloseCircle, CloseCircleFilled, Eye, Folder, FolderOpened, Hide, Moon, Plus, Loading, Search, Sun, User },
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
