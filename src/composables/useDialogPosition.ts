import { computed, ref, watch } from 'vue';
import { useDraggable, useElementSize, useWindowSize } from '@vueuse/core';

import * as UTILS from '@/utils/position';
import { UseDialogPositionParamsType } from '@/types';
import { useDialogDirection } from '@/composables';
import { BASE_OFFSET_LIMIT, NEW_DIALOG_OFFSET } from '@/constants';

export default function useDialogPosition({
  index,
  wrapperRef,
  draggableRef,
  referenceElementRef,
  placement,
  disableDragging,
}: UseDialogPositionParamsType) {
  const x = ref<number>(0);
  const y = ref<number>(0);
  const centerX = ref<number>(0);
  const centerY = ref<number>(0);
  const offset = ref(referenceElementRef ? 0 : index * NEW_DIALOG_OFFSET);
  const isDialogRendered = ref(false);
  const isDraggingDialog = ref(false);

  const referenceElement = computed(() => {
    if (referenceElementRef && '$el' in referenceElementRef) {
      return referenceElementRef.$el;
    }

    return referenceElementRef;
  });

  const rightOffsetLimit = computed(
    () => windowWidth.value - dialogWidth.value - BASE_OFFSET_LIMIT
  );
  const bottomOffsetLimit = computed(
    () => windowHeight.value - headerHeight.value
  );

  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const { width: dialogWidth, height: dialogHeight } =
    useElementSize(wrapperRef);
  const { height: headerHeight } = useElementSize(draggableRef);

  const { direction } = useDialogDirection({
    x,
    referenceElement,
    placement,
    isDialogRendered,
  });

  const calcFinalHorizontalPosition = (x: number) => {
    return UTILS.calcFinalHorizontalPositionBasedOnLimits({
      x,
      windowWidth: windowWidth.value,
      dialogWidth: dialogWidth.value,
      leftOffsetLimit: BASE_OFFSET_LIMIT,
      rightOffsetLimit: rightOffsetLimit.value,
      direction: direction.value,
    });
  };

  const calcFinalVerticalPosition = (y: number) => {
    return UTILS.calcFinalVerticalPositionBasedOnLimits({
      y,
      topOffsetLimit: BASE_OFFSET_LIMIT,
      bottomOffsetLimit: bottomOffsetLimit.value,
    });
  };

  const calcHorizontalPositionOnDialogResize = () => {
    let newX;

    if (referenceElementRef && !isDialogRendered.value) {
      newX = UTILS.calcHorizontalPositionBasedOnReferenceElement({
        placement: placement,
        dialogWidth: dialogWidth.value,
        referenceElement: referenceElement.value,
      });
    } else {
      newX = UTILS.calcHorizontalPositionBasedOnCenterCoordinate({
        centerX: centerX.value,
        prevDialogWidth: dialogWidth.value,
        offset: offset.value,
      });
    }

    return calcFinalHorizontalPosition(newX);
  };

  const calcVerticalPositionOnDialogResize = () => {
    let newY;

    if (referenceElementRef && !isDialogRendered.value) {
      newY = UTILS.calcVerticalPositionBasedOnReferenceElement({
        placement: placement,
        dialogHeight: dialogHeight.value,
        referenceElement: referenceElement.value,
      });
    } else {
      newY = UTILS.calcVerticalPositionBasedOnCenterCoordinate({
        centerY: centerY.value,
        prevDialogHeight: dialogHeight.value,
        offset: offset.value,
      });
    }

    return calcFinalVerticalPosition(newY);
  };

  const handleHorizontalPositionOnDialogResize = (oldDialogWidth) => {
    centerX.value = UTILS.calcCenterHorizontalPositionBasedOnDialog({
      x: x.value,
      windowWidth: windowWidth.value,
      dialogWidth: oldDialogWidth,
      direction: direction.value,
    });

    x.value = calcHorizontalPositionOnDialogResize();
  };

  const handleVerticalPositionOnDialogResize = (oldDialogHeight) => {
    centerY.value = UTILS.calcCenterVerticalPositionBasedOnDialog({
      y: y.value,
      windowHeight: windowHeight.value,
      dialogHeight: oldDialogHeight,
    });

    y.value = calcVerticalPositionOnDialogResize();
  };

  const handleDialogResize = (oldDialogWidth, oldDialogHeight) => {
    handleHorizontalPositionOnDialogResize(oldDialogWidth);
    handleVerticalPositionOnDialogResize(oldDialogHeight);

    if (!isDialogRendered.value) {
      isDialogRendered.value = true;
      offset.value = 0;
    }
  };

  if (!disableDragging) {
    const { x: draggableX, y: draggableY } = useDraggable(wrapperRef, {
      handle: draggableRef,
      initialValue: {
        x: x.value,
        y: y.value,
      },
      onStart() {
        isDraggingDialog.value = true;
      },
      onEnd() {
        isDraggingDialog.value = false;
      },
      onMove: () => {
        x.value = calcFinalHorizontalPosition(draggableX.value);
        y.value = calcFinalVerticalPosition(draggableY.value);
      },
    });
  }

  watch([dialogWidth, dialogHeight], (_, [oldDialogWidth, oldDialogHeight]) => {
    handleDialogResize(oldDialogWidth, oldDialogHeight);
  });

  watch(direction, () => {
    x.value = calcFinalHorizontalPosition(x.value);
  });

  return {
    x,
    y,
    direction,
    isDragging: isDraggingDialog,
  };
}
