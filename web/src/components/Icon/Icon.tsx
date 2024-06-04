import type { FunctionComponent } from 'react'
import type { IIconProps } from './types'

export const Icon: FunctionComponent<IIconProps> = (props) => {
  const { name } = props

  return (
    <img src={`img/${name}.svg`} alt={name} />
  )
}
