import React from 'react';

import classes from './SideDrawer.css';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxwrap from '../../../hoc/Auxwrap/Auxwrap'

const sideDrawer = (props) => {

    return (
        <Auxwrap>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={[classes.SideDrawer, props.show ? classes.Open : classes.Close].join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxwrap>
    );
}

export default sideDrawer;