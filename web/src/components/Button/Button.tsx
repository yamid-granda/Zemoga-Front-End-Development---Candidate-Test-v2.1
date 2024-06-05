import './Button.scss'
import classnames from 'classnames'
import type { FunctionComponent } from 'react'
import { Icon } from '../Icon/Icon'
import type { IButtonProps } from './types'

export const Button: FunctionComponent<IButtonProps> = (props) => {
  const {
    text,
    variant,
    size,
    children,
    state,
    icon,
    onClick,
    isActive,
    ...buttonProps
  } = props

  const isIcon = Boolean(icon)

  return (
    <button
      className={classnames('rt-button', {
        'rt-button--outline': variant === 'outline',
        'rt-button--sm': size === 'sm',
        'rt-button--warning': state === 'warning',
        'rt-button--icon': isIcon,
        'rt-button--active': isActive,
      })}
      type="button"
      {...buttonProps}
      onClick={onClick && onClick}
    >
      {icon ? <Icon name={icon} /> : text ?? children}
    </button>
  )
}
