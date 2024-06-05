import { fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setVotesInLocalStorage } from '@Rulings/services/localStorage/setVotesInLocalStorage'
import { PreviousRulings } from '../PreviousRulings'
import { celebrities } from '../__mocks__'

describe('previous rulings component', () => {
  describe('no persistent data', () => {
    beforeEach(() => {
      render(<PreviousRulings celebrities={celebrities} />)
    })

    it('shows right initial percentages', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const ruling1Positive = within(ruling1).getByTestId('positive-percentage')
      const ruling1Negative = within(ruling1).getByTestId('negative-percentage')

      const ruling2 = screen.getByTestId(`${celebrities[1].name}-ruling`)
      const ruling2Positive = within(ruling2).getByTestId('positive-percentage')
      const ruling2Negative = within(ruling2).getByTestId('negative-percentage')

      // THEN
      expect(ruling1Positive.textContent).toBe('20%')
      expect(ruling1Negative.textContent).toBe('80%')
      expect(ruling2Positive.textContent).toBe('56.3%')
      expect(ruling2Negative.textContent).toBe('43.7%')
    })

    it('increments percentages when voting', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const thumbsUpButton = within(ruling1).getByTestId('thumbs-up')
      fireEvent.click(thumbsUpButton)
      const voteButton = within(ruling1).getByTestId('vote-action')

      // WHEN
      fireEvent.click(voteButton)

      // THEN
      const ruling1Positive = within(ruling1).getByTestId('positive-percentage')
      const ruling1Negative = within(ruling1).getByTestId('negative-percentage')
      expect(ruling1Positive.textContent).toBe('20.8%')
      expect(ruling1Negative.textContent).toBe('79.2%')
    })

    it('decrements percentages when voting', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const thumbsDownButton = within(ruling1).getByTestId('thumbs-down')
      fireEvent.click(thumbsDownButton)
      const voteButton = within(ruling1).getByTestId('vote-action')

      // WHEN
      fireEvent.click(voteButton)

      // THEN
      const ruling1Positive = within(ruling1).getByTestId('positive-percentage')
      const ruling1Negative = within(ruling1).getByTestId('negative-percentage')
      expect(ruling1Positive.textContent).toBe('19.8%')
      expect(ruling1Negative.textContent).toBe('80.2%')
    })

    it('prevents voting when not has feedback', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const voteButton = within(ruling1).getByTestId('vote-action')

      // WHEN
      fireEvent.click(voteButton)

      // THEN
      const ruling1Positive = within(ruling1).getByTestId('positive-percentage')
      const ruling1Negative = within(ruling1).getByTestId('negative-percentage')
      expect(ruling1Positive.textContent).toBe('20%')
      expect(ruling1Negative.textContent).toBe('80%')
    })

    it('changes vote button text on positive vote', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const thumbsUpButton = within(ruling1).getByTestId('thumbs-up')
      fireEvent.click(thumbsUpButton)
      const voteButton = within(ruling1).getByTestId('vote-action')
      expect(voteButton.textContent).toBe('Vote Now')

      // WHEN
      fireEvent.click(voteButton)

      // THEN
      expect(voteButton.textContent).toBe('Vote Again')
    })

    it('changes vote button text on negative vote', async () => {
      // GIVEN
      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const thumbsDownButton = within(ruling1).getByTestId('thumbs-down')
      fireEvent.click(thumbsDownButton)
      const voteButton = within(ruling1).getByTestId('vote-action')
      expect(voteButton.textContent).toBe('Vote Now')

      // WHEN
      fireEvent.click(voteButton)

      // THEN
      expect(voteButton.textContent).toBe('Vote Again')
    })

    afterEach(() => {
      localStorage.clear()
    })
  })

  describe('with persistent data', () => {
    it('shows right initial percentages', async () => {
      // GIVEN
      setVotesInLocalStorage({
        votesByCelebrity: {
          'Kanye West': {
            positive: 1,
            negative: 100,
          },
        },
      })

      render(<PreviousRulings celebrities={celebrities} />)

      const ruling1 = screen.getByTestId(`${celebrities[0].name}-ruling`)
      const ruling1Positive = within(ruling1).getByTestId('positive-percentage')
      const ruling1Negative = within(ruling1).getByTestId('negative-percentage')

      const ruling2 = screen.getByTestId(`${celebrities[1].name}-ruling`)
      const ruling2Positive = within(ruling2).getByTestId('positive-percentage')
      const ruling2Negative = within(ruling2).getByTestId('negative-percentage')

      // THEN
      expect(ruling1Positive.textContent).toBe('10.4%')
      expect(ruling1Negative.textContent).toBe('89.6%')
      expect(ruling2Positive.textContent).toBe('56.3%')
      expect(ruling2Negative.textContent).toBe('43.7%')
    })
  })
})
