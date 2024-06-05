export type IIconName = 'thumbs-up' | 'thumbs-down'

export interface IIconProps extends React.HTMLAttributes<HTMLImageElement>{
  name: IIconName
}
