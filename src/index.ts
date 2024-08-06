import { render, createVNode, AppContext } from 'vue';

import type { App } from 'vue';

import { useDialog, DialogContextKey } from './useDialog';
import store from './store';
import Dialog from './Dialog.vue';

import './index.css';

const install = (
  Vue: App,
  { appContext }: { appContext: AppContext }
): void => {
  Vue.provide(DialogContextKey, store);

  Vue.config.globalProperties.$dialogs = store;

  const dialogVNode = createVNode(Dialog);

  dialogVNode.appContext = { ...appContext };

  render(dialogVNode, document.body);
};

Dialog.install = install;

export { useDialog, Dialog };
export default { install };
