import { Ref } from 'vue';
import { MaybeRefOrGetter } from '@vueuse/core';

export type DialogPlacement =
  | 'bottom'
  | 'top'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-right'
  | 'top-left';

export type DialogDirection = 'rtl' | 'lrt';

export type MoveDirection = 'left' | 'right';

type ComponentType = {
  component: any;
  props: Record<string, any>;
};

export type DialogConsumerProps = {
  content?: MaybeRefOrGetter<ComponentType | string>;
  title?: MaybeRefOrGetter<ComponentType | string>;
  expandableLabel?: MaybeRefOrGetter<ComponentType | string>;
  expandable?: boolean;
  expandedContent?: MaybeRefOrGetter<ComponentType | string>;
  defaultExpanded?: boolean;
  footer?: MaybeRefOrGetter<ComponentType | string>;
  bodyClass?: string;
  wrapperClass?: string;
  footerClass?: string;
  multiple?: boolean;
  referenceElementRef?: any;
  placement?: DialogPlacement;
  afterClose?: () => void;
  afterOpen?: () => void;
  direction?: DialogDirection;
  onExpandedUpdate?: (value: boolean) => void;
};

export type DialogProps = DialogConsumerProps & {
  id: string;
  index: number;
  zIndex: number;
};

export type StoreAPIType = {
  lastMultiDialogZIndex: Ref<number>;
  selectedDialogId: Ref<string | undefined>;
  dialogs: Ref<DialogProps[]>;
  add: (dialog: DialogConsumerProps) => string;
  remove: (id?: string) => void;
  focus: (id: string) => void;
  selectNextDialog: () => void;
  removeAll: () => void;
};

export type UseDialogReturnType = {
  add: (dialog: DialogConsumerProps) => string;
  selectedDialogId: Ref<string | undefined>;
};

export type UseDialogPositionParamsType = {
  index: number;
  wrapperRef: Ref;
  draggableRef: Ref;
  referenceElementRef: any;
  placement: DialogPlacement;
  disableDragging: boolean;
};

export type UseDialogDirectionParamsType = {
  x: Ref<number>;
  referenceElement: Ref;
  isDialogRendered: Ref<boolean>;
  placement: DialogPlacement;
};
