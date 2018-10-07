import {reducer} from './auth';
import {AUTH_SUCCESS} from '../actions/actionTypes';

describe('Auth reducer', () => {
    let initialState = {
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        };

    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    })

    it('should return initial state', () => {
        expect(reducer(initialState, {type: AUTH_SUCCESS, token: 'token', loading: false, userId: 'userId', error: null})).toEqual({
            token: 'token',
            userId: 'userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

});