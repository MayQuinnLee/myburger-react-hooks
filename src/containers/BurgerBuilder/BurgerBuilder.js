import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        console.log(props);
        props.onSetIngredient();
    });

    const updatePurchaseState = () => {
        const sum = Object.keys(props.ing)
            .map( igKey => {
                return props.ing[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    };

    const purchaseHandler = () => {
        if(props.isAuthenticated) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath('./checkout');
            props.history.push('/auth');
        }
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout'); //only passing URL
    };

    const disabledInfo = {...props.ing};
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0 //salad: true, meat: false, ...
    };

    let orderSummary = null;
    let burger = props.error ? <p> Ingredients can't be loaded </p> : <Spinner />

    if(props.ing){
        burger = (
          <React.Fragment>
            <Burger ingredients={props.ing} />
            <BuildControls
              ingredientAdded={props.onAddIngredient}
              ingredientRemoved={props.onRemoveIngredient}
              disabled={disabledInfo}
              purchasable={updatePurchaseState()}
              isAuth = {props.isAuthenticated}
              ordered={purchaseHandler}
              price={props.totalP}
            />
          </React.Fragment>
        );
        orderSummary = (<OrderSummary
                ingredients={props.ing}
                price={props.totalP}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
        />);
    };

    return (
        <React.Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}              
            </Modal>
            {burger}
        </React.Fragment>
    );

}

const mapStateToProps = state => {
    return {
        ing: state.burgerBuilder.ingredients,
        totalP: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingType) => dispatch(actions.addIng(ingType)),
        onRemoveIngredient: (ingType) => dispatch(actions.removeIng(ingType)),
        onSetIngredient: () => dispatch(actions.initIng()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));