import { PayloadAction } from '@reduxjs/toolkit'
import { take, cancel, actionChannel } from '@redux-saga/core/effects'
import { TakeableChannel } from 'redux-saga'
import { call } from 'redux-saga/effects'

/**
 *
 * TODO: successActionTypes, failureActionTypes 병합!
 *
 * 여러개의 fork 된 task 를 병렬처리하는 사가:
 *
 * 하나의 saga 라도 실패하면 해당 flow 안에 진행 중인 모든 saga 를 취소한다.
 * -------------------------------------------------------------------------------------------
 * redux-saga 의 all(effects) 의 부족한 점:
 *
 * 외부와의 통신을 해당 flow 의 success, failure 타입으로 마무리 하는 것으로 saga 를 작성한다면
 * 모든 saga 는 try/catch 문에 걸리는 에러를 던지지 않아 all(effects) 로는 각 saga 가 성공/실패로 종료 됐는지 알 수 없다.
 */
export function* executeParallelTasks(tasks: any[], successActionTypes: string[], failureActionTypes: string[]) {
  let limit = tasks.length

  while (limit > 0) {
    const actions: PayloadAction = yield take([...successActionTypes, ...failureActionTypes])
    if (failureActionTypes.some(type => type === actions.type)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const task of tasks) {
        yield cancel(task)
      }
      break
    }

    limit -= 1
  }

  return limit === 0
}

export function* takeQueue(actionType: string, task: any) {
  const toastChannel: TakeableChannel<Record<string, unknown>> = yield actionChannel(actionType)

  while (true) {
    const action: PayloadAction = yield take(toastChannel)
    yield call(task, action)
  }
}
