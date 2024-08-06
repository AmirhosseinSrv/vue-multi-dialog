import { ref, watch } from 'vue';

import uuid from '@/utils/uuid';

import {
  SINGLE_DIALOG_Z_INDEX,
  START_INDEX_OFFSET,
  START_MULTI_DIALOG_Z_INDEX_OFFSET,
} from '@/constants';

import type { StoreAPIType, DialogProps } from './types';

const dialogs = ref<DialogProps[]>([]);
const selectedDialogId = ref<string | undefined>();
const lastIndex = ref<number>(START_INDEX_OFFSET);
const lastMultiDialogZIndex = ref<number>(START_MULTI_DIALOG_Z_INDEX_OFFSET);

watch(
  dialogs,
  () => {
    if (dialogs.value.length === 0) {
      lastIndex.value = START_INDEX_OFFSET;
      lastMultiDialogZIndex.value = START_MULTI_DIALOG_Z_INDEX_OFFSET;
    }
  },
  {
    deep: true,
  }
);

const api: StoreAPIType = {
  lastMultiDialogZIndex,

  selectedDialogId,

  dialogs,

  add: (dialog) => {
    const id = uuid('dialog-');

    lastIndex.value++;

    if (dialog.multiple) {
      lastMultiDialogZIndex.value++;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dialogs.value.push({
      ...dialog,
      id,
      index: lastIndex.value,
      zIndex: dialog.multiple
        ? lastMultiDialogZIndex.value
        : SINGLE_DIALOG_Z_INDEX,
    });

    return id;
  },

  selectNextDialog() {
    const sortedDialogsBasedOnZIndex = dialogs.value.sort(
      (firstDialog, secondDialog) =>
        firstDialog.zIndex > secondDialog.zIndex ? -1 : 1
    );

    if (sortedDialogsBasedOnZIndex.length) {
      api.focus(sortedDialogsBasedOnZIndex[0].id);
    }
  },

  remove(id = selectedDialogId.value) {
    if (id) {
      const index = dialogs.value.findIndex((dialog) => dialog.id === id);

      if (index > -1) {
        dialogs.value.splice(index, 1);

        if (id === selectedDialogId.value) {
          selectedDialogId.value = undefined;
        }

        api.selectNextDialog();
      }
    }
  },

  focus(id) {
    const dialog = dialogs.value.find((dialog) => dialog.id === id);

    if (dialog) {
      selectedDialogId.value = id;

      if (dialog.zIndex !== lastMultiDialogZIndex.value) {
        lastMultiDialogZIndex.value++;
        dialog.zIndex = lastMultiDialogZIndex.value;
      }
    }
  },

  removeAll() {
    dialogs.value = [];
    lastIndex.value = START_INDEX_OFFSET;
    lastMultiDialogZIndex.value = START_MULTI_DIALOG_Z_INDEX_OFFSET;
    selectedDialogId.value = undefined;
  },
};

export default api;
