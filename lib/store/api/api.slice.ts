import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@lib/store/store'
import { ISubmitRegisterParams, ISubmitRegisterResult } from '@lib/store/api/api.type'

const baseUrl = 'https://kitchencompanion.eastus.cloudapp.azure.com/api/v1/'

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
      // POST
      submitRegister: builder.mutation({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/specific-url',
          method: METHOD_TYPE,
        }),
      }),
      // GET
      getRelatedRecipes: builder.query({
        query: ({ keyword }) => `recipe/search/titles?title=${keyword}`,
      }),
      getSearchedResults: builder.query({
        query: ({ keyword }) => `/recipe/search?title=${keyword}&calories=&appliances=&tags=`,
      }),
      getFilter: builder.query({
        query: () => `/recipe/search/filters`,
      }),
    }
  },
})

export const { useSubmitRegisterMutation, useGetRelatedRecipesQuery, useGetSearchedResultsQuery, useGetFilterQuery } =
  apiSlice
