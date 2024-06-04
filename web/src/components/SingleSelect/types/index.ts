
export interface ISelectOption {
  value: string
  label: string
}

export interface ISingleSelectProps {
  options: ISelectOption[]
  value: string
  name: string
  onChange: (value: string) => void
}