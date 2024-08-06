<template>
  <span v-if="typeof content === 'string'" class="text-sm font-bold">
    {{ content }}
  </span>

  <component
    v-else-if="content"
    :is="(content as ComponentType).component"
    v-bind="(content as ComponentType).props"
  />
</template>

<script setup lang="ts">
import { MaybeRefOrGetter } from '@vueuse/core';

type ComponentType = {
  component: any;
  props: Record<string, any>;
};

type DynamicComponentProps = {
  content?: MaybeRefOrGetter<ComponentType | string>;
};

defineProps<DynamicComponentProps>();
</script>
