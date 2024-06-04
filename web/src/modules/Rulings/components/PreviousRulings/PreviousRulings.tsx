import './PreviousRulings.scss'
import { type FunctionComponent, useState } from 'react'
import classNames from 'classnames'
import { Ruling } from '../Ruling/Ruling'
import type { IPreviousRulingsProps } from './types'
import { SingleSelect } from '@/components/SingleSelect/SingleSelect'
import type { ISelectOption } from '@/components/SingleSelect/types'

const viewOptions: ISelectOption[] = [
  { value: 'list', label: 'List' },
  { value: 'grid', label: 'Grid' },
]

export const PreviousRulings: FunctionComponent<IPreviousRulingsProps> = (props) => {
  const { celebrities } = props
  const [view, setView] = useState(viewOptions[1].value)

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
