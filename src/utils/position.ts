import { DialogPlacement, MoveDirection } from '@/types';
import { REFERENCE_ELEMENT_MARGIN } from '@/constants';

const calcFinalHorizontalPositionBasedOnLimits = ({
  x,
  windowWidth,
  dialogWidth,
  leftOffsetLimit,
  rightOffsetLimit,
  direction,
}: {
  x: number;
  windowWidth: number;
  dialogWidth: number;
  leftOffsetLimit: number;
  rightOffsetLimit: number;
  direction: MoveDirection;
}) => {
  const allowMoveLeft = x > leftOffsetLimit;
  const allowMoveRight = x < rightOffsetLimit;

  const leftOffset = !allowMoveLeft
    ? leftOffsetLimit
    : !allowMoveRight
    ? rightOffsetLimit
    : x;

  return {
    left: leftOffset,
    right: windowWidth - leftOffset - dialogWidth,
  }[direction];
};

const calcFinalVerticalPositionBasedOnLimits = ({
  y,
  topOffsetLimit,
  bottomOffsetLimit,
}: {
  y: number;
  topOffsetLimit: number;
  bottomOffsetLimit: number;
}) => {
  const allowMoveUp = y > topOffsetLimit;
  const allowMoveDown = y < bottomOffsetLimit;

  return !allowMoveUp ? topOffsetLimit : !allowMoveDown ? bottomOffsetLimit : y;
};

const calcCenterHorizontalPositionBasedOnDialog = ({
  x,
  windowWidth,
  dialogWidth,
  direction,
}: {
  x: number;
  windowWidth: number;
  dialogWidth: number;
  direction: MoveDirection;
}) => {
  if (dialogWidth) {
    return {
      left: dialogWidth / 2 + x,
      right: windowWidth - (dialogWidth / 2 + x),
    }[direction];
  } else {
    return windowWidth / 2;
  }
};

const calcCenterVerticalPositionBasedOnDialog = ({
  y,
  windowHeight,
  dialogHeight,
}: {
  y: number;
  windowHeight: number;
  dialogHeight: number;
}) => {
  if (dialogHeight) {
    return dialogHeight / 2 + y;
  } else {
    return windowHeight / 2;
  }
};

const calcHorizontalPositionBasedOnCenterCoordinate = ({
  centerX,
  prevDialogWidth,
  offset,
}: {
  centerX: number;
  prevDialogWidth: number;
  offset: number;
}) => {
  const centerDialogX = prevDialogWidth / 2;

  return centerX - centerDialogX - offset;
};

const calcVerticalPositionBasedOnCenterCoordinate = ({
  centerY,
  prevDialogHeight,
  offset,
}: {
  centerY: number;
  prevDialogHeight: number;
  offset: number;
}) => {
  const centerDialogY = prevDialogHeight / 2;

  return centerY - centerDialogY + offset;
};

const calcHorizontalPositionBasedOnReferenceElement = ({
  placement,
  referenceElement,
  dialogWidth,
}: {
  placement: DialogPlacement;
  referenceElement: HTMLElement;
  dialogWidth: number;
}) => {
  const position = placement.includes('left')
    ? 'left'
    : placement.includes('right')
    ? 'right'
    : 'middle';

  const { right, left } = referenceElement.getBoundingClientRect();
  const middle = left + (right - left) / 2;

  return {
    right: right,
    middle: middle - dialogWidth / 2,
    left: left - dialogWidth,
  }[position];
};

const calcVerticalPositionBasedOnReferenceElement = ({
  placement,
  referenceElement,
  dialogHeight,
}: {
  placement: DialogPlacement;
  referenceElement: HTMLElement;
  dialogHeight: number;
}) => {
  const position = placement.includes('bottom')
    ? 'bottom'
    : placement.includes('top')
    ? 'top'
    : 'middle';

  const { bottom, top } = referenceElement.getBoundingClientRect();

  return {
    bottom: bottom + REFERENCE_ELEMENT_MARGIN,
    middle: (bottom - top) / 2,
    top: top - dialogHeight - REFERENCE_ELEMENT_MARGIN,
  }[position];
};

export {
  calcFinalHorizontalPositionBasedOnLimits,
  calcFinalVerticalPositionBasedOnLimits,
  calcCenterHorizontalPositionBasedOnDialog,
  calcCenterVerticalPositionBasedOnDialog,
  calcHorizontalPositionBasedOnCenterCoordinate,
  calcVerticalPositionBasedOnCenterCoordinate,
  calcHorizontalPositionBasedOnReferenceElement,
  calcVerticalPositionBasedOnReferenceElement,
};
