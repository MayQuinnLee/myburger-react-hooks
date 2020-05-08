import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';

const Logout = props => {
    const {onLogout} = props;

    useEffect(() => {
        onLogout();
    },[onLogout]) //ensure this run only when this component mounts

    return <Redirect to='/' />
};

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);