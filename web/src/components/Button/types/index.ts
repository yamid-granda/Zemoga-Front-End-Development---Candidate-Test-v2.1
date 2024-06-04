import type { PropsWithChildren } from 'react'
import type { IIconName } from '@/components/Icon/types'

export interface IButtonProps extends PropsWithChildren, React.HTMLAttributes<HTMLButtonElement> {
  text?: string
  variant?: 'outline'
  size?: 'sm'
  state?: 'warning'
  icon?: IIconName
  onClick?: () => void
}
