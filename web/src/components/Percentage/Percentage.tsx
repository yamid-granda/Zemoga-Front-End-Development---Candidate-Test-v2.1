import type { FunctionComponent } from 'react'
import type { IPercentageProps } from './types'

export const Percentage: FunctionComponent<IPercentageProps> = (props) => {
  const { value } = props
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(value)

  return <span className="rt-percentage">{formattedValue}</span>
}
