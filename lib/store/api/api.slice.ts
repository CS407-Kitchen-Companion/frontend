import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@lib/store/store'
import { ISubmitRegisterParams, ISubmitRegisterResult } from '@lib/store/api/api.type'

// TODO
const baseUrl = 'SERVER URL'

const METHOD_TYPE = 'POST'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const additionalHeaders = {
        accept: 'application/json',
        'content-type': 'text/plain',
      }

      Object.entries(additionalHeaders).forEach(([key, value]) => {
        if (value !== undefined) {
          headers.set(key, value)
        }
      })

      return headers
    },
  }),
  endpoints(builder) {
    return {
      submitRegister: builder.mutation<ISubmitRegisterParams, ISubmitRegisterResult>({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/specific-url',
          method: METHOD_TYPE,
        }),
      }),
    }
  },
})

export const { useSubmitRegisterMutation } = apiSlice
