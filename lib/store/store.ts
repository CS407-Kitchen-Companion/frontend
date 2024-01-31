import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { Store } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware, { Task } from 'redux-saga'
import { GetServerSidePropsContext, GetStaticPropsContext, NextPageContext } from 'next'
import { AppContext } from 'next/app'
import isString from 'lodash/isString'
import rootSaga from '@lib/store/root.saga'
import rootReducer, { CombinedReducerState } from '@lib/store/root.reducer'
import { apiSlice } from '@lib/store/api/api.slice'

export interface SagaStore extends Store {
  sagaTask?: Task
}

type MakeStoreContext = NextPageContext | AppContext | GetStaticPropsContext | GetServerSidePropsContext

// eslint-disable-next-line import/no-mutable-exports
export let store: EnhancedStore

export const makeStore = (context: MakeStoreContext) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware()

  // 2: Add an extra parameter for applying middleware:
  store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return [...getDefaultMiddleware(), apiSlice.middleware, sagaMiddleware]
    },
  })

  // // 3: Run your sagas on server
  ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

  // 4: now return the store:
  return store
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
  serializeState: state => {
    // Hack needed to avoid JSON-Serialization validation error from Next.js https://github.com/zeit/next.js/discussions/11209
    // >>> Reason: `undefined` cannot be serialized as JSON. Please use `null` or omit this value all together.
    return JSON.stringify(state)
  },
  deserializeState: state => {
    return isString(state) ? JSON.parse(state) : state
  },
})

export type RootState = CombinedReducerState
