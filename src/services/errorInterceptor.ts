import type { RefreshAccessTokenResponse } from '@/types/auth.type'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import api from './api'
import { apiPathV1 } from './apiPath'
import { EAuthErrCode } from '@/enums/auth'
import router from '@/router/router'
import type { TApiError } from '@/types/api.type'

export async function errorInterceptor(err: any) {
  const axiosErr = err as AxiosError
  const response = axiosErr.response?.data as TApiError

  switch (response.errorCode) {
    case EAuthErrCode.ACCESS_TOKEN_EXPIRED:
      return await refreshAccessToken(err, axiosErr)

    case EAuthErrCode.ACCESS_TOKEN_INVALID:
    case EAuthErrCode.REFRESH_TOKEN_REVOKE:
    case EAuthErrCode.ACCESS_TOKEN_REVOKE:
    case EAuthErrCode.REFRESH_TOKEN_INVALID: {
      alert('session expired!')
      router.push('/login')
    }
  }

  return Promise.reject(err)
}

async function refreshAccessToken(err: any, axiosError: AxiosError) {
  const result = await api.post(apiPathV1.auth.refreshAccessToken, {}, { withCredentials: true })
  const resPayload = result.data as RefreshAccessTokenResponse

  localStorage.setItem('accessToken', resPayload.data.token)

  const config = axiosError.config as AxiosRequestConfig<any>
  if (config.headers) {
    config.headers.Authorization = `Bearer ${resPayload.data.token}`
  } else return Promise.reject(err)

  return Promise.resolve(api.request(config))
}
