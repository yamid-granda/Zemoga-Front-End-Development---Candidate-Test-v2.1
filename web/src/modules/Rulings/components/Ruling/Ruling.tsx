import './Ruling.scss'
import { type FunctionComponent, useMemo, useState } from 'react'
import type { IRulingProps } from './types'
import { getTimeAgoFromStrDate } from '@/utils/getTimeAgoFromTimestamp'
import { Button } from '@/components/Button/Button'
import { Icon } from '@/components/Icon/Icon'
import { Percentage } from '@/components/Percentage/Percentage'
import type { IButtonProps } from '@/components/Button/types'

export const Ruling: FunctionComponent<IRulingProps> = (props) => {
  const {
    name,
    description,
    lastUpdated,
    category,
    picture,
    votes,
  } = props

  const [isVoted, setIsVoted] = useState(false)

  const lastUpdatedText = useMemo(() => {
    const timeAgo = getTimeAgoFromStrDate(lastUpdated)
    const capitalizedCategory = category.charAt(0).toUpperCase() + category.slice(1)
    return `${timeAgo} in ${capitalizedCategory}`
  }, [
    lastUpdated,
    category,
  ])

  const progress: number = useMemo(() => {
    const totalVotes = votes.positive + votes.negative
    const percentage = votes.positive / totalVotes
    return percentage
  }, [votes])

  const progressLeft: number = 1 - progress

  const handleVote = () => {
    setIsVoted(!isVoted)
  }

  const statusButtonProps: IButtonProps = {
    size: 'sm',
    tabIndex: -1,
    role: 'presentation',
    ...progressLeft > 0.5
      ? { icon: 'thumbs-up' }
      : { icon: 'thumbs-down', state: 'warning' },
  }

  return (
    <div className="rt-ruling">
      <div className="rt-ruling__picture">
        <img
          className="rt-ruling__picture-img"
          src={`img/${picture}`}
          alt={name}
          width={300}
          height={300}
        />
      </div>

      <div className="rt-ruling__shadow" />
      <h3 className="rt-ruling__name">{name}</h3>
      <div className="rt-ruling__status">
        <Button {...statusButtonProps} />
      </div>
      <p className="rt-ruling__description">{description}</p>
      <p className="rt-ruling__last-updated">{lastUpdatedText}</p>

      <div className="rt-ruling__actions">
        <Button
          size="sm"
          onClick={handleVote}
          icon="thumbs-up"
        />

        <Button
          size="sm"
          state="warning"
          icon="thumbs-down"
          onClick={handleVote}
        >
          <img src="img/thumbs-down.svg" alt="thumbs down" />
        </Button>

        <Button
          text="Vote Now"
          variant="outline"
          onClick={handleVote}
        />
      </div>

      <div className="rt-ruling__summary">
        <div
          className="rt-ruling__summary-positive-progress"
          style={{ width: `${progress * 100}%` }}
        />

        <div
          className="rt-ruling__summary-negative-progress"
          style={{ width: `${progressLeft * 100}%` }}
        />

        <div className="rt-ruling__summary-caption">
          <div className="rt-ruling__summary-info">
            <Icon name="thumbs-up" />
            <span className="rt-ruling__summary-text">
              <Percentage value={progress} />
            </span>
          </div>

          <div className="rt-ruling__summary-info">
            <span className="rt-ruling__summary-text">
              <Percentage value={progressLeft} />
            </span>
            <Icon name="thumbs-down" />
          </div>
        </div>
      </div>
    </div>
  )
}
