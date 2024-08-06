import { computed, ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';

import { MoveDirection, UseDialogDirectionParamsType } from '@/types';

export default function useDialogDirection({
  x,
  referenceElement,
  placement,
  isDialogRendered,
}: UseDialogDirectionParamsType) {
  const direction = ref<MoveDirection>('left');

  const { width: windowWidth } = useWindowSize();

  const middleOfWindowWidth = computed(() => windowWidth.value / 2);

  const calcDirection = () => {
    if (referenceElement && !isDialogRendered) {
      return calcDirectionBasedOnReferenceElement();
    } else {
      return calcDirectionBasedOnDragPosition();
    }
  };

  const calcDirectionBasedOnReferenceElement = () => {
    const isLeftPlacement = placement.includes('left');
    const isRightPlacement = placement.includes('right');
    const isCenterPlacement = !isLeftPlacement && !isRightPlacement;

    const referenceElementLeftOffset = referenceElement.value.offsetLeft;
    const referenceElementWidth = referenceElement.value.offsetWidth;

    if (
      (isLeftPlacement &&
        referenceElementLeftOffset > middleOfWindowWidth.value) ||
      (isRightPlacement &&
        referenceElementLeftOffset + referenceElementWidth >
          middleOfWindowWidth.value) ||
      (isCenterPlacement &&
        referenceElementLeftOffset + referenceElementWidth / 2 >
          middleOfWindowWidth.value)
    ) {
      return 'right';
    }

    return 'left';
  };

  const calcDirectionBasedOnDragPosition = () => {
    if (direction.value === 'left' && x.value > middleOfWindowWidth.value) {
      return 'right';
    } else if (
      direction.value === 'right' &&
      x.value > middleOfWindowWidth.value
    ) {
      return 'left';
    }

    return direction.value;
  };

  watch(
    x,
    () => {
      setTimeout(() => {
        direction.value = calcDirection();
      });
    },
    { immediate: true }
  );

  return {
    direction,
  };
}
