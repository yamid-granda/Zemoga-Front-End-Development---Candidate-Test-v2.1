export interface ICelebrityVotesConfig {
  positive: number
  negative: number
}

export interface ICelebrity {
  name: string
  description: string
  category: string
  picture: string
  lastUpdated: string
  votes: ICelebrityVotesConfig
}

export type IVotesByCelebrity = Record<string, ICelebrityVotesConfig>

export enum IRulingFeedback {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}
