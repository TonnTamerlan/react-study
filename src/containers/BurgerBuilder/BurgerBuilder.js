import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';

import { addIngredient, removeIngredient, initIngredient, purchaseInit, setRedirectPath } from '../../store/actions/';

import Auxwrap from '../../hoc/Auxwrap/Auxwrap'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

export class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (!this.props.isAutheticated) {
            this.props.onSetRedirectPath('/checkout');
            this.props.history.push('/auth');
        } else {
            this.setState({ purchasing: true });
        }
    }

    puschaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Auxwrap>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        isPurchasable={(this.updatePurchaseState(this.props.ings))}
                        purchase={this.purchaseHandler}
                        isAuth={this.props.isAutheticated}
                    />
                </Auxwrap>);
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    canceled={this.puschaseCancelHandler}
                    continued={this.purchaseContinueHandler}
                    price={this.props.totalPrice}
                />)
        }

        return (
            <Auxwrap>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.puschaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxwrap>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAutheticated: state.auth.token !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredient()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onSetRedirectPath: (path) => dispatch(setRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));