import type { IVotesByCelebrity } from '@Rulings/types'
import { VOTES_LOCAL_STORAGE_KEY } from '@Rulings/configs'
import type { IResponse } from '@/types'
import { setItemInLocalStorage } from '@/clients/localStorage'

interface ISetVotesInLocalStorageConfig {
  votesByCelebrity: IVotesByCelebrity
}

export function setVotesInLocalStorage(config: ISetVotesInLocalStorageConfig): IResponse<null> {
  return setItemInLocalStorage({
    key: VOTES_LOCAL_STORAGE_KEY,
    value: config.votesByCelebrity,
  })
}
