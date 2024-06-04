
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