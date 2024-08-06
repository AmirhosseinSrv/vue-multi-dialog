import { createApp } from 'vue';

import Play from './Play.vue';
import { Dialog } from '../src';

import '../src/index.css';

const app = createApp(Play);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-expect-error
app.use(Dialog, {
  appContext: app._context,
});

app.mount('#app');
