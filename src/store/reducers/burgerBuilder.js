import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIng = (state, action) => {
    const updatedIngredient = { [action.ingType]: state.ingredients[action.ingType] + 1 };
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
        building: true,
    };
    return updateObject(state, updatedState);
}

const removeIng = (state, action) => {
    const updatedIng = { [action.ingType]: state.ingredients[action.ingType] - 1 };
    const updatedIngs = updateObject(state.ingredients,updatedIng);
    const updatedSt = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingType],
        building: true
    };
    return updateObject(state, updatedSt);
}

const setIng = (state,action) => {
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese},
        error: false,
        totalPrice: 4,
        building: false,
    })
}

const fetchIngFailed = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_ING: return addIng(state, action);
        case actionTypes.REMOVE_ING: return removeIng(state,action);
        case actionTypes.SET_ING: return setIng(state,action);
        case actionTypes.FETCH_ING_FAILED: return fetchIngFailed(state,action);
        default: return state
    }
}

export default reducer;

