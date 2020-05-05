import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    
    sideDrawerCloseHandler =() => (
        this.setState({showSideDrawer: false})
    );

    sideDrawerToggler =() => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar 
                isAuth= {this.props.isAuthenticated}
                drawerToggleClicked ={this.sideDrawerToggler}/>
                <SideDrawer 
                isAuth= {this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                    {/*wrapping all the children into 'layout' components*/}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null, //isAuthenticated is true
    };
};

export default connect(mapStateToProps)(Layout);