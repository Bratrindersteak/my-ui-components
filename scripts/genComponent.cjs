const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const componentName = process.argv[2];
const ComponentName = componentName.replace(/(^[a-z])/, match => match.toUpperCase());

fs.mkdirSync(`src/components/${componentName}`);
fs.mkdirSync(`src/components/${componentName}/styles`);

const styleIndexData = `@use './vars';

.my-${componentName} {
  
}
`;
fs.writeFileSync(`src/components/${componentName}/styles/index.scss`, styleIndexData);

const styleVarsData = `@use '@/styles/vars';

.my-${componentName} {
  
}
`;
fs.writeFileSync(`src/components/${componentName}/styles/vars.scss`, styleVarsData);

const vueData = `<template>
  <div></div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { genId, toKebabCase, toPascalCase } from "@/utils";

const name = 'my${ComponentName}';

const id = genId(name);

defineOptions({
  name: toPascalCase(name),
});
</script>

<style lang="scss" src="./styles/index.scss"></style>
`;
fs.writeFileSync(`src/components/${componentName}/${componentName}.vue`, vueData);

const indexData = `import type { App, Plugin } from 'vue';
import ${ComponentName} from './${componentName}.vue';

${ComponentName}.install = (app: App) => {
  app.component(${ComponentName}.name, ${ComponentName});
  return app;
};

export default ${ComponentName} as typeof ${ComponentName} & Plugin;
`;
fs.writeFileSync(`src/components/${componentName}/index.ts`, indexData);

fs.appendFileSync(`src/components/index.ts`, `export { default as ${ComponentName} } from './${componentName}';` + '\n');
