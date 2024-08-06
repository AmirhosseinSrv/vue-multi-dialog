import { inject } from 'vue';

import type { InjectionKey } from 'vue';

import type { StoreAPIType, UseDialogReturnType } from './types';

export const DialogContextKey: InjectionKey<StoreAPIType> =
  Symbol('DialogContext');

function useDialog(): UseDialogReturnType & StoreAPIType {
  const dialog = inject(DialogContextKey);

  if (!dialog) {
    throw new Error(
      'useDialog must be used within a app with registered NDialog plugin'
    );
  }

  return dialog;
}

export { useDialog };
