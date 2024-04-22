export type Size = 'default' | 'large' | 'small';
export type Type = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export interface Props {
  disabled?: boolean;
  size?: Size;
  type?: Type;
  color?: string;
  closeable?: boolean;
  closeIcon?: string;
}
