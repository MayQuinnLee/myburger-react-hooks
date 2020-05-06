import React, {useState} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisible(false)
    };

    const sideDrawerToggler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    };

    return(
        <React.Fragment>
            <Toolbar 
            isAuth= {props.isAuthenticated}
            drawerToggleClicked ={sideDrawerToggler}/>
            <SideDrawer 
            isAuth= {props.isAuthenticated}
            open={sideDrawerIsVisible} 
            closed={sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {props.children}
                {/*wrapping all the children into 'layout' components*/}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null, //isAuthenticated is true
    };
};

export default connect(mapStateToProps)(Layout);