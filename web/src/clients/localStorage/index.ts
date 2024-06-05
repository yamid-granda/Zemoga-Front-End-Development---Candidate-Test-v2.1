import type { IResponse } from '@/types'

interface ISetItemInLocalStorageConfig {
  key: string
  value: unknown
}

export function setItemInLocalStorage<T>(config: ISetItemInLocalStorageConfig): IResponse<T> {
  const { key, value } = config

  try {
    const response = localStorage.setItem(key, JSON.stringify(value)) as T

    if (!response) {
      return {
        isOk: false,
      }
    }

    return {
      isOk: true,
      response,
    }
  }

  catch {
    return {
      isOk: false,
    }
  }
}

interface IGetItemFromLocalStorageConfig {
  key: string
}

export function getItemFromLocalStorage<T>(config: IGetItemFromLocalStorageConfig): IResponse<T> {
  const { key } = config

  try {
    const response = localStorage.getItem(key)
    const hasError = !response || !Object.keys(response).length

    if (hasError){
      return {
        isOk: false,
      }
    }

    return {
      isOk: true,
      response: JSON.parse(response),
    }
  }

  catch {
    return {
      isOk: false,
    }
  }
}
