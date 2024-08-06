<template>
  <DialogItem
    v-for="dialog of dialogs"
    :key="dialog.id"
    :dir="dialog.direction || 'rtl'"
    v-bind="dialog"
    @after-close="dialog.afterClose"
    @after-open="dialog.afterOpen"
    @update:expanded="dialog.onExpandedUpdate"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'NDialog', inheritAttrs: false });
</script>

<script setup lang="ts">
import { useDialog } from '@/index';

import DialogItem from './DialogItem.vue';

const { dialogs } = useDialog();
</script>
