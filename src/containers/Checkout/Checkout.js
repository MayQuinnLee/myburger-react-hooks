import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';

const Checkout = props => {

    const checkoutCancelledHandler = () => (
        props.history.goBack()
    );

    const checkoutContinueHandler = () => (
        props.history.push('checkout/contact-data')
    );

    let summary = <Redirect to ='/'/>;

    if(props.ings){
        const purchasedRedirect = props.purchased ? <Redirect to ='/'/> : null;
        summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler} 
                checkoutContinue={checkoutContinueHandler}
                />
                <Route path={props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    };
    return summary
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalP: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);