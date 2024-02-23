import submitRegister from '@lib/store/userData/__sagas__/submitRegister.saga'
import submitLogin from '@lib/store/userData/__sagas__/submitLogin.saga'
import updatePasswordSaga from './__sagas__/updatePassword.saga'

export default [...submitRegister, ...submitLogin, ...updatePasswordSaga]
