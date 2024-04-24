export type Size = 'default' | 'large' | 'small';
export type Key = string | number;
export type OptionData = {
  key?: Key;
  value: Key;
  label: string;
  disabled?: boolean;
}
