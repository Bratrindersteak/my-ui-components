import type { App, Plugin } from 'vue';
import Switch from './switch.vue';

Switch.install = (app: App) => {
  app.component(Switch.name, Switch);
  return app;
};

export default Switch as typeof Switch & Plugin;
