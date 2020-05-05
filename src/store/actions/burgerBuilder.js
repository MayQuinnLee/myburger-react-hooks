import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIng = (ingType) => {
    return {
        type: actionTypes.ADD_ING,
        ingType: ingType
    }
};

export const removeIng = (ingType) => {
    return {
        type: actionTypes.REMOVE_ING,
        ingType: ingType
    }
};

export const setIng = (ingredients) => {
    return{    
        type: actionTypes.SET_ING,
        ingredients: ingredients
    }
};

export const fetchIngFailed = () => {
    return{    
        type: actionTypes.FETCH_ING_FAILED
    }
};

export const initIng = () => {
    return dispatch => {
        axios.get("https://myburger-react-64ebe.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIng(response.data))
        })
        .catch(error => {
            dispatch(fetchIngFailed())
        })
    }}

