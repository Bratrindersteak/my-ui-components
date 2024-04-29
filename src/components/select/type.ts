export type Size = 'default' | 'large' | 'small';
export type Key = string | number;
export type OptionData = {
  key?: Key;
  value: Key;
  label: string | number;
  disabled?: boolean;
}

export interface Props {
  modelValue?: Key | Key[]
  data?: Array<OptionData>
  multiple?: boolean
  clearable?: boolean
  disabled?: boolean
  size?: Size
  placeholder?: string
}
