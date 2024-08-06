<template>
  <div
    class="flex justify-center items-center w-screen min-h-screen gap-4 bg-blue-110 flex-col bg-opacity-25"
  >
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="handleOpenDialog"
    >
      Open Dialog
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useDialog } from '../src';
import SampleDialog from './SampleDialog.vue';

const { add: addDialog } = useDialog();

const handleOpenDialog = () => {
  addDialog({
    title: 'Hello',
    bodyClass: '!w-[600px]',
    multiple: true,
    expandable: true,
    expandableLabel: 'Expand',
    expandedContent: computed(() => ({
      component: SampleDialog,
      props: {},
    })),
    content: computed(() => ({
      component: SampleDialog,
      props: {},
    })),
  });
};
</script>
