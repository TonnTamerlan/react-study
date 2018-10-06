import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/';
import Loadable from 'react-loadable';


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Checkout from './containers/Checkout/Checkout';
// import Orders from './containers/Orders/Orders';
// import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const Loading = () => <div>Loading...</div>;

const Auth = Loadable({
  loader: () => import('./containers/Auth/Auth'),
  loading: Loading,
});

const Orders = Loadable({
  loader: () => import('./containers/Orders/Orders'),
  loading: Loading,
});

const Checkout = Loadable({
  loader: () => import('./containers/Checkout/Checkout'),
  loading: Loading,
});

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );

        if (this.props.isAutheticated) {

            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/auth" component={Auth} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )

        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

const mapStateToProprs = state => {
    return {
        isAutheticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState())
    };
};

export default withRouter(connect(mapStateToProprs, mapDispatchToProps)(App));
