import type { App, Plugin } from 'vue';
import Pagination from './pagination.vue';

Pagination.install = (app: App) => {
  app.component(Pagination.name, Pagination);
  return app;
};

export default Pagination as typeof Pagination & Plugin;
