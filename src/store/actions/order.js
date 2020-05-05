import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id.name,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {    
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseBurger = (order, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, order) //.json for firebase only
        .then(response => {
            console.log(response.data) //firebase return an id, but the id is called name = response.data.name
            dispatch(purchaseBurgerSuccess(response.data, order))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}

export const purchaseInit = () => {
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart =() => {
    return{
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json' + queryParams)
        .then(res=>{
            //firebase will return object and we convert to array
            const fetchedOrders =[];
            // console.log(res.data);
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key,
                });
            }
            // console.log(fetchedOrders);
            dispatch(fetchOrderSuccess(fetchedOrders))
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err))
        })
    }
}
