import './SingleSelect.scss'
import { type FunctionComponent, useMemo, useState } from 'react'
import classnames from 'classnames'
import type { ISelectOption, ISingleSelectProps } from './types'

export const SingleSelect: FunctionComponent<ISingleSelectProps> = (props) => {
  const {
    options,
    name,
    value,
    onChange,
  } = props

  const [isOpen, setIsOpen] = useState(false)

  const optionsByValue = useMemo(() => {
    return options.reduce((acc, option) => {
      const { value, ...rest } = option
      acc[value] = rest
      return acc
    }, {} as Record<string, Omit<ISelectOption, 'value'>>)
  }, [options])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.target.value)
    setIsOpen(false)
  }

  function onOptionClick() {
    setIsOpen(false)
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Escape')
      setIsOpen(false)
  }

  return (
    <div className={classnames('rt-single-select', {
      'rt-single-select--open': isOpen,
    })}
    >
      <button
        type="button"
        className="rt-single-select__button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={onKeyDown}
      >
        <span className="rt-single-select__button-text">{optionsByValue[value].label}</span>
      </button>

      <div className="rt-single-select__options">
        {options.map(option => (
          <label
            key={option.value}
            className="rt-single-select__option"
          >
            <input
              className="rt-single-select__option-input"
              tabIndex={isOpen ? 0 : -1}
              type="radio"
              value={option.value}
              name={name}
              onChange={handleChange}
              onClick={onOptionClick}
              checked={value === option.value}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
