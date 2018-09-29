import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utillity';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}
const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: false });
}
const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}
const purchaseBurgerSuccess = (state, action) => {
    const order = {
        id: action.orderId,
        ingredients: action.orderData.ingredients,
        orderData: action.orderData.orderData,
        price: action.orderData.price
    };

    return updateObject(state, {
        orders: state.orders.concat(order),
        loading: false,
        purchased: true
    });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.PURCHASE_INIT: return purchaseInit(state, action);
        case actionType.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action);
        case actionType.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state, action);
        case actionType.FETCH_ORDER_FAIL: return fetchOrderFail(state, action);
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionType.FETCH_ORDER_START: return fetchOrderStart(state, action);
        case actionType.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;