import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utillity';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateObject(state, {token: action.token, loading: false, userId: action.userId, error: null});
}

const authFail = (state, action) => {
    return updateObject(state, {token: null, loading: false, userId: null, error: action.error});
}

const authLogout = (state, action) => {
    return updateObject(state, {token: null, loading: false, userId: null, error: null})
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START: return authStart(state, action);
        case actionType.AUTH_SUCCESS: return authSuccess(state, action);
        case actionType.AUTH_FAIL: return authFail(state, action);
        case actionType.AUTH_LOGOUT: return authLogout(state, action);
        case actionType.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default:
            return state;
    }
}

export default reducer;