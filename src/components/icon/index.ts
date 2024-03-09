import type { App, Plugin } from 'vue';
import Icon from './icon.vue';

Icon.install = (app: App) => {
  app.component(Icon.name, Icon);
  return app;
};

export default Icon as typeof Icon & Plugin;
