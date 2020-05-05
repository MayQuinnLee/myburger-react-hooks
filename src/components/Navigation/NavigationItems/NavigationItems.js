import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';



const navigationItems = (props) => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth ? 
            <NavigationItem link="/orders">Orders</NavigationItem> :
            null
        }
        {props.isAuth ? 
            <NavigationItem link="/logout">Log out</NavigationItem> :
            <NavigationItem link="/auth">Authentication</NavigationItem>
        }
    </ul>
);

export default navigationItems;

//this is a dumb component, don't connect to the store, instead use layout a class component to link the data to navigation item, since layout is used to wrap navigationItems