import type { ICelebrity, IRulingFeedback } from '@Rulings/types'

export interface IOnVoteEvent {
  celebrityName: string
  type: IRulingFeedback
}

export interface IRulingProps extends ICelebrity {
  onVote?: (event: IOnVoteEvent) => void
}
