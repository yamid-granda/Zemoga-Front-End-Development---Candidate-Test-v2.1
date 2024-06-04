import './PreviousRulings.scss'
import type { FunctionComponent } from 'react'
import { Ruling } from '../Ruling/Ruling'
import type { IPreviousRulingsProps } from './types'

export const PreviousRulings: FunctionComponent<IPreviousRulingsProps> = (props) => {
  const { celebrities } = props

  return (
    <div className="rt-previous-rulings">
      <div className="rt-previous-rulings__items">
        {celebrities.map(celebrity => (
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
            />
          </div>
        ))}
      </div>
    </div>
  )
}
