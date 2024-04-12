import type { App, Plugin } from 'vue';
import Tag from './tag.vue';

Tag.install = (app: App) => {
  app.component(Tag.name, Tag);
  return app;
};

export default Tag as typeof Tag & Plugin;
