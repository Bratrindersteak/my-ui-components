import type { App, Plugin } from 'vue';
import Checkbox from './checkbox.vue';

Checkbox.install = (app: App) => {
  app.component(Checkbox.name, Checkbox);
  return app;
};

export default Checkbox as typeof Checkbox & Plugin;
