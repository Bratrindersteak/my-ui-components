import type { App, Plugin } from 'vue';
import Tree from './tree.vue';
import TreeNode from './tree-node.vue';

Tree.install = (app: App) => {
  app.component(Tree.name, Tree);
  app.component(TreeNode.name, TreeNode);
  return app;
};

export default Tree as typeof Tree & Plugin;
