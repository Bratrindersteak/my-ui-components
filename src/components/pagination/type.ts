export type Type = 'default' | 'simple';
export type Size = 'default' | 'large' | 'small';
export interface Props {
  disabled?: boolean
  type?: Type
  size?: Size
  currentPage?: number
  defaultCurrentPage?: number
  pageSize?: number
  defaultPageSize?: number
  total?: number
}

export interface Slots {
  prev(): any
  next(): any
}
