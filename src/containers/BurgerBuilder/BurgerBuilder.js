import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ing = useSelector((state) => {
    return state.burgerBuilder.ingredients;
  });
  const totalP = useSelector((state) => {
    return state.burgerBuilder.totalPrice;
  });
  const error = useSelector((state) => {
    return state.burgerBuilder.error;
  });
  const isAuthenticated = useSelector((state) => {
    return state.auth.token !== null;
  });

  //this will no longer be part of props
  const onAddIngredient = (ingType) => dispatch(actions.addIng(ingType));
  const onRemoveIngredient = (ingType) => dispatch(actions.removeIng(ingType));
  const onSetIngredient = useCallback(() => dispatch(actions.initIng()), [
    dispatch,
  ]);
  const onPurchaseInit = () => dispatch(actions.purchaseInit());
  const onSetAuthRedirectPath = (path) =>
    dispatch(actions.setAuthRedirectPath(path));

  console.log(props);

  useEffect(() => {
    onSetIngredient();
  }, [onSetIngredient]);

  const updatePurchaseState = () => {
    const sum = Object.keys(ing)
      .map((igKey) => {
        return ing[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      onSetAuthRedirectPath("./checkout");
      props.history.push("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onPurchaseInit();
    props.history.push("/checkout"); //only passing URL
  };

  const disabledInfo = { ...ing };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0; //salad: true, meat: false, ...
  }

  let orderSummary = null;
  let burger = error ? <p> Ingredients can't be loaded </p> : <Spinner />;

  if (ing) {
    burger = (
      <React.Fragment>
        <Burger ingredients={ing} />
        <BuildControls
          ingredientAdded={onAddIngredient}
          ingredientRemoved={onRemoveIngredient}
          disabled={disabledInfo}
          purchasable={updatePurchaseState()}
          isAuth={isAuthenticated}
          ordered={purchaseHandler}
          price={totalP}
        />
      </React.Fragment>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ing}
        price={totalP}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
