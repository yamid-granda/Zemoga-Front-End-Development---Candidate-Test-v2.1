import './PreviousRulings.scss'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { setVotesInLocalStorage } from '@Rulings/services/localStorage/setVotesInLocalStorage'
import type { ICelebrity, IVotesByCelebrity } from '@Rulings/types'
import { getVotesFromLocalStorage } from '@Rulings/services/localStorage/getVotesFromLocalStorage'
import { Ruling } from '../Ruling/Ruling'
import type { IPreviousRulingsProps } from './types'
import type { IOnVoteEvent } from '@/modules/Rulings/components/Ruling/types'
import { SingleSelect } from '@/components/SingleSelect/SingleSelect'
import type { ISelectOption } from '@/components/SingleSelect/types'

const viewOptions: ISelectOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
]

export const PreviousRulings: FunctionComponent<IPreviousRulingsProps> = (props) => {
  const { celebrities } = props
  const [view, setView] = useState(viewOptions[1].value)
  const [votesByCelebrity, setVotesByCelebrity] = useState<IVotesByCelebrity>({})

  const votedCelebrities: ICelebrity[] = useMemo(() => celebrities.map(celebrity => ({
    ...celebrity,
    votes: {
      positive: celebrity.votes.positive + (votesByCelebrity[celebrity.name]?.positive ?? 0),
      negative: celebrity.votes.negative + (votesByCelebrity[celebrity.name]?.negative ?? 0),
    },
  })), [
    celebrities,
    votesByCelebrity,
  ])

  useEffect(() => {
    const getVotesResponse = getVotesFromLocalStorage()

    if (getVotesResponse.isOk) {
      setVotesByCelebrity(getVotesResponse.response)
    }
  }, [])

  function onVote(event: IOnVoteEvent) {
    setVotesByCelebrity((previousVotes) => {
      if (!previousVotes[event.celebrityName]) {
        previousVotes[event.celebrityName] = {
          positive: 0,
          negative: 0,
        }
      }

      previousVotes[event.celebrityName][event.type] += 1
      return { ...previousVotes }
    })

    setVotesInLocalStorage({ votesByCelebrity })
  }

  return (
    <div className={classNames('rt-previous-rulings', {
      'rt-previous-rulings--list': view === viewOptions[0].value,
    })}
    >
      <div className="rt-previous-rulings__head">
        <h2 className="rt-previous-rulings__title">Previous Rulings</h2>

        <div className="rt-previous-rulings__view-selector">
          <SingleSelect
            name="view"
            value={view}
            onChange={setView}
            options={viewOptions}
          />
        </div>
      </div>

      <div className="rt-previous-rulings__items">
        {votedCelebrities.map(celebrity => (
          <div
            className="rt-previous-rulings__item"
            key={celebrity.name}
          >
            <Ruling
              name={celebrity.name}
              description={celebrity.description}
              category={celebrity.category}
              picture={celebrity.picture}
              lastUpdated={celebrity.lastUpdated}
              votes={celebrity.votes}
              onVote={onVote}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
