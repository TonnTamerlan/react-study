import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utillity';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = state.ingredients[action.ingredientName] + 1;
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: updatedIngredient });
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    })
    return updatedState;
}

const removeIngredient = (state, action) => {
    const updatedIngredient = state.ingredients[action.ingredientName] - 1;
    const updatedIngredients = updateObject(state.ingredients, { [action.ingredientName]: updatedIngredient });
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    })
    return updatedState;
}

const setIngredients = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat
    })
    const updatedState = updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: 4,
        error: false,
        building: false
    })
    return updatedState;
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action)
        case actionType.SET_INGREDIENTS: return setIngredients(state, action);
        case actionType.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default:
            return state;
    }

};

export default reducer;