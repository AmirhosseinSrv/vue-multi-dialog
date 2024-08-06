# Vue Multi Dialog

A vue multi dialog with expand and drag features.

## Installation

In your project directory, run:

#### `npm install vue-multi-dialog`

## Demo
Here are the demos of some features like adding a single dialog, multiple dialog, expandable dialog, draggable dialog.

### Single Dialog
![Insert image from local Demo](https://github.com/AmirhosseinSrv/vue-multi-dialog/blob/main/images/1.gif?raw=true)

### Multi Dialog 
![Insert image from Unsplash Demo](https://github.com/AmirhosseinSrv/vue-multi-dialog/blob/main/images/2.gif?raw=true)

### Expandable Dialog
![Edit image Demo](https://github.com/AmirhosseinSrv/vue-multi-dialog/blob/main/images/3.gif?raw=true)

### Draggable Dialog
![Edit image Demo](https://github.com/AmirhosseinSrv/vue-multi-dialog/blob/main/images/4.gif?raw=true)

## How to use
```typescript
import { Dialog } from 'vue-multi-dialog';

app.use(Dialog);
```

```typescript
import { useDialog } from 'vue-multi-dialog';

const { add: addDialog } = useDialog();

addDialog({
    title: 'Hello',
    bodyClass: '!w-[600px]',
    multiple: true,
    content: computed(() => ({
      component: SampleDialog,
      props: {},
    })),
});
```

## Types
```typescript
type DialogPlacement =
| 'bottom'
| 'top'
| 'bottom-right'
| 'bottom-left'
| 'top-right'
| 'top-left';
```

```typescript
type DialogDirection = 'rtl' | 'lrt';
```

```typescript
type MoveDirection = 'left' | 'right';
```

```typescript
type DialogProps = {
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
```

```typescript
type UseDialogReturnType = {
  add: (dialog: DialogConsumerProps) => string;
  selectedDialogId: Ref<string | undefined>;
};
```