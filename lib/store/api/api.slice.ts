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
        'content-type': 'application/json',
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
      submitRegister: builder.mutation({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/user/new',
          method: METHOD_TYPE,
        }),
      }),
      submitLogin: builder.mutation({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/user/login',
          method: METHOD_TYPE,
        }),
      }),
      createRecipe: builder.mutation({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/recipe/new',
          method: METHOD_TYPE,
        }),
      }),
      changePassword: builder.mutation({
        query: ({ ...body }) => ({
          body: JSON.stringify(body),
          url: '/user/updatePassword',
          method: METHOD_TYPE,
        }),
      }),
      // GET
      // TODO APPLY filter options for recipes
      getRelatedRecipes: builder.query({
        query: ({ keyword }) => `recipe/search/titles?title=${keyword}`,
      }),
      getSearchedResults: builder.query({
        query: ({ keyword }) => `/recipe/search?title=${keyword}`,
      }),
      getFilter: builder.query({
        query: () => `/recipe/search/filters`,
      }),
      getRecipeById: builder.query({
        query: ({ postID }) => `recipe/${postID}`,
      }),
      getUserById: builder.query({
        query: ({ id }) => `user/${id}`,
      }),
    }
  },
})

export const { useSubmitRegisterMutation, useGetRelatedRecipesQuery, useGetSearchedResultsQuery, useGetFilterQuery, useGetRecipeById, useGetUserById} =
  apiSlice
