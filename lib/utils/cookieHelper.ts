import { useDispatch,useSelector } from 'react-redux'
import { selectUserData, userDataAction } from '@lib/store/userData/userData.slice'
import Cookies from 'js-cookie';
export function checkCookie() {
    const dispatch = useDispatch()
    const user = useSelector(selectUserData)
    const token = user.token
    
    if(token === ''){
        const tokenCookie = Cookies.get('token')
        const idCookie = Cookies.get('id')
        if(tokenCookie && idCookie){
            dispatch(userDataAction.setToken({token: tokenCookie}))
            dispatch(userDataAction.setId({id: parseInt(idCookie)}))
        } else { 
            return false
        }
    } 
    return true
}