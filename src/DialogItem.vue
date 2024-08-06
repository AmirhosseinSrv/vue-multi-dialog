<template>
  <div
    ref="wrapperRef"
    :class="[classes.wrapper, wrapperClass, { 'opacity-20': isDragging }]"
    :style="wrapperStyle"
    @mousedown="handleClick"
  >
    <div
      v-bind="$attrs"
      ref="dialogRef"
      :aria-labelledby="`${id}-label`"
      :class="[classes.dialog, bodyClass]"
      :style="bodyStyle"
      role="dialog"
      tabindex="-1"
    >
      <div class="relative">
        <div ref="headerRef" :class="classes.header">
          <div
            :id="`${id}-label`"
            :class="{
              'rtl:ml-4 ltr:mr-4': !expandable,
              invisible: isDragging,
            }"
          >
            <DynamicComponent v-if="title" :content="title" />
          </div>
        </div>

        <div class="flex items-center absolute z-10 left-3 top-3">
          <div
            v-if="expandable"
            :class="classes.expandable"
            @click="handleExpand"
          >
            <DynamicComponent
              v-if="expandableLabel"
              :content="expandableLabel"
              :class="{ invisible: isDragging }"
            />

            <ArrowLeftIcon
              :size="16"
              class="inline ltr:hidden"
              :class="{ 'rotate-180': expanded }"
            />
            <ArrowRightIcon
              :size="16"
              class="inline rtl:hidden"
              :class="{ 'rotate-180': expanded }"
            />
          </div>

          <CloseIcon
            :size="16"
            ref="closeRef"
            tabindex="-1"
            class="cursor-pointer focus:outline-none"
            @click="close"
          />
        </div>
      </div>

      <div class="p-4 flex gap-4" :class="{ invisible: isDragging }">
        <DynamicComponent :content="content" />

        <div v-if="expandable && expandedContent" v-show="expanded">
          <DynamicComponent :content="expandedContent" />
        </div>
      </div>

      <div
        v-if="footer"
        class="p-4"
        :class="[footerClass, { invisible: isDragging }]"
      >
        <DynamicComponent :content="footer" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({ name: 'NDialogItem', inheritAttrs: false });
</script>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { MaybeRefOrGetter } from '@vueuse/core';
import { useDialog } from '@/index';

import { CloseIcon, ArrowLeftIcon, ArrowRightIcon } from './icons';
import { DialogPlacement } from './types';
import * as Themes from './theme';
import { useDialogPosition, useToggle } from './composables';
import DynamicComponent from './DynamicComponent.vue';

type ComponentType = {
  component: any;
  props: Record<string, any>;
};

type NDialogItemProps = {
  id: string;
  zIndex: number;
  index: number;
  bodyClass?: string;
  wrapperClass?: string;
  footerClass?: string;
  expandable?: boolean;
  defaultExpanded?: boolean;
  multiple?: boolean;
  referenceElementRef?: any;
  placement?: DialogPlacement;
  content?: MaybeRefOrGetter<ComponentType | string>;
  title?: MaybeRefOrGetter<ComponentType | string>;
  expandableLabel?: MaybeRefOrGetter<ComponentType | string>;
  expandedContent?: MaybeRefOrGetter<ComponentType | string>;
  footer?: MaybeRefOrGetter<ComponentType | string>;
};

type NDialogItemEmits = {
  (e?: 'update:expanded', value?: boolean): boolean;
  (e?: 'afterOpen'): void;
  (e?: 'afterClose'): void;
};

const props = withDefaults(defineProps<NDialogItemProps>(), {
  title: '',
  bodyClass: '',
  footerClass: '',
  wrapperClass: '',
  expandableLabel: '',
  expandable: false,
  defaultExpanded: false,
  multiple: false,
  placement: 'bottom-left',
  referenceElementRef: undefined,
  expandedContent: undefined,
  footer: undefined,
});

const emit = defineEmits<NDialogItemEmits>();

const closeRef = ref();
const dialogRef = ref();
const headerRef = ref();
const wrapperRef = ref();
const wrapperStyle = ref();
const bodyStyle = ref();

const classes = computed(() => ({
  header: props.multiple ? Themes.MULTI_DIALOG_HEADER : Themes.DIALOG_HEADER,
  expandable: Themes.DIALOG_EXPANDABLE,
  wrapper: props.multiple ? Themes.MULTI_DIALOG_WRAPPER : Themes.DIALOG_WRAPPER,
  dialog: Themes.DIALOG_BASE,
}));

const { x, y, direction, isDragging } = useDialogPosition({
  wrapperRef: props.multiple ? wrapperRef : dialogRef,
  index: props.index,
  draggableRef: headerRef,
  placement: props.placement,
  referenceElementRef: props.referenceElementRef,
  disableDragging: !props.multiple,
});

const { remove, focus } = useDialog();

const [expanded, toggleExpansion] = useToggle(props.defaultExpanded);

const close = () => {
  emit('afterClose');
  remove(props.id);
};

const handleExpand = () => {
  emit('update:expanded', !expanded.value);
  toggleExpansion(!expanded.value);
};

const handleClick = () => {
  focus(props.id);
};

const setWrapperStyles = () => {
  if (props.multiple) {
    wrapperStyle.value = {
      [direction.value]: `${x.value}px`,
      top: `${y.value}px`,
      zIndex: props.zIndex,
    };
  } else {
    if (props.referenceElementRef) {
      bodyStyle.value = {
        [direction.value]: `${x.value}px`,
        top: `${y.value}px`,
        zIndex: props.zIndex,
        position: 'absolute',
      };
    }

    wrapperStyle.value = {
      zIndex: props.zIndex,
    };
  }
};

watch([x, y, () => props.zIndex], () => {
  setWrapperStyles();
});
</script>
