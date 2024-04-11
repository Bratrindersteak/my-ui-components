import type { App, Plugin } from 'vue';
import Select from './select.vue';
import SelectOption from './select-option.vue';

Select.install = (app: App) => {
  app.component(Select.name, Select);
  app.component(SelectOption.name, SelectOption);
  return app;
};

Select.SelectOption = SelectOption;

export default Select as typeof Select & Plugin;
