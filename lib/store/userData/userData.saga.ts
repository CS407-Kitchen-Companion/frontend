import submitRegister from '@lib/store/userData/__sagas__/submitRegister.saga'
import submitLogin from '@lib/store/userData/__sagas__/submitLogin.saga'
import updatePasswordSaga from './__sagas__/updatePassword.saga'
import getUserByIdSaga from './__sagas__/getUserById.saga'
import deleteUserSaga from './__sagas__/deleteUser.saga'
import getProfileSaga from './__sagas__/getProfile.saga'
import editUserSaga from './__sagas__/editUser.saga'

export default [...submitRegister, ...editUserSaga,...submitLogin,...getProfileSaga, ...updatePasswordSaga, ...deleteUserSaga, ...getUserByIdSaga]
