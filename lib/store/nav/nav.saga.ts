import { PayloadAction } from '@reduxjs/toolkit'
import { call, all, takeEvery, takeLeading } from 'redux-saga/effects'
import Router from 'next/router'
import { navActions, NavChangePayload } from '@lib/store/nav/nav.slice'

export function* navPush(action: PayloadAction<NavChangePayload>) {
  Router.push(action.payload.url, action.payload.as, action.payload.options)
  yield call(Router.push, action.payload.url, action.payload.as, action.payload.options)
}

function* navReplace(action: PayloadAction<NavChangePayload>) {
  yield call(Router.replace, action.payload.url, action.payload.as, action.payload.options)
}

function* watchNavPush() {
  yield takeEvery(navActions.push.type, navPush)
}

function* watchNavReplace() {
  yield takeEvery(navActions.replace.type, navReplace)
}

export default [watchNavPush, watchNavReplace]
