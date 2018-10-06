import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';

import Auxwrap from '../Auxwrap/Auxwrap';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prev) => { return { showSideDrawer: !prev.showSideDrawer } });
    }

    render() {
        return (
            <Auxwrap>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    toggleSideDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer} 
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>{this.props.children}</main>
            </Auxwrap>)
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Layout);