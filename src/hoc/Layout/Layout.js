import React, {Component} from 'react';

import classes from './Layout.css';

import Auxwrap from '../Auxwrap/Auxwrap';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prev) =>{return {showSideDrawer: !prev.showSideDrawer}});
    }

    render() {
        return (
            <Auxwrap>
                <Toolbar  toggleSideDrawer={this.sideDrawerToggleHandler}/>
                <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </Auxwrap>)
    }
};

export default Layout;