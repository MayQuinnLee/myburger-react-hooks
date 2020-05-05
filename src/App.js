import React, {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent ( () => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent ( () => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent ( () => {
  return import('./containers/Auth/Auth')
});
//lazy loading chuck1,2,3 . only load when required

const App = props => {
    useEffect(() => {
      props.onTryAutoSignIn();
    });

    let route = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if(props.isAuthenticated){
      route = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    //now we cannot reach orders page if we are not logged in (guarded route)
    return (
      <div>
        <Layout>
          {route}
        </Layout>
      </div>
    );
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn : () => dispatch(actions.authCheckState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
