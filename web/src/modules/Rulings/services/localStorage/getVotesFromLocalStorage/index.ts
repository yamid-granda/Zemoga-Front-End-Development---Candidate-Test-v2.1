import type { IVotesByCelebrity } from '@Rulings/types'
import { VOTES_LOCAL_STORAGE_KEY } from '@Rulings/configs'
import type { IResponse } from '@/types'
import { getItemFromLocalStorage } from '@/clients/localStorage'

export function getVotesFromLocalStorage(): IResponse<IVotesByCelebrity> {
  return getItemFromLocalStorage({ key: VOTES_LOCAL_STORAGE_KEY })
}
