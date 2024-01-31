import { all, call, delay, take } from 'redux-saga/effects'

export function* blockingThrottle(throttleDelay: number, action: any, task: any) {
  while (true) {
    yield take(action)
    yield all([call(task), delay(throttleDelay)])
  }
}
