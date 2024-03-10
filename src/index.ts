import type { App } from 'vue';
import * as components from './components';
import { version } from '../package.json';

export function install(app: App): App {
  Object.values(components).forEach(component => {
    app.use(component);
  });

  return app;
}

export { version };

export default {
  install,
  version,
};
