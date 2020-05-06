import React, {useEffect, Suspense} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';
import { render } from 'enzyme';

const Checkout = React.lazy( () => {
  return import('./containers/Checkout/Checkout')
});

const Orders = React.lazy( () => {
  return import('./containers/Orders/Orders')
});

const Auth = React.lazy( () => {
  return import('./containers/Auth/Auth')
});
//lazy loading chuck1,2,3 . only load when required

const App = props => {
    useEffect(() => {
      props.onTryAutoSignIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]); //it should only run on the first render cycle

    let route = (
      <Switch>
        <Route path="/auth" render={() => <Auth />}/>
        <Route path="/" component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    )

    if(props.isAuthenticated){
      route = (
        <Switch>
          <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
          <Route path="/orders" render={(props) => <Orders {...props}/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" render={(props) => <Auth {...props}/>} />
          <Route path="/" component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }
    //now we cannot reach orders page if we are not logged in (guarded route)
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading...</p>}>{route}</Suspense>
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
