export type TreeData = {
  key: string;
  label: string;
  disabled: boolean;
  children: Array<TreeData>;
}

export type TreeDataPlain = {
  key: string;
  label: string;
  index: number;
  level: number;
  disabled?: boolean;
  expanded?: boolean;
  display? :boolean;
}
