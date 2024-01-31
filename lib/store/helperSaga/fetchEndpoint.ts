import { apiSlice } from '@lib/store/api/api.slice'
import { store } from '@lib/store/store'

export function* fetchEndpoint<
  E extends keyof typeof apiSlice.endpoints,
  P extends Parameters<typeof apiSlice.endpoints[E]['initiate']>[0]
>(endpoint: E, params: P) {
  const subscription = apiSlice.endpoints[endpoint].initiate(params as any)(store.dispatch, store.getState, null)
  const { data, error } = yield subscription
  yield subscription.reset()
  return { data, error }
}
