import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionType from '../../store/actions';

import axios from '../../axios-orders'

import Auxwrap from '../../hoc/Auxwrap/Auxwrap'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {

    state = {
        //totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log('BurgerBuilder props', this.props);
        /* this.reqIntercetor = axios.get('/ingredients.json')
            .then(resp => {
                this.setState({ ingredients: resp.data })
            })
            .catch(err => {
                this.setState({ error: true });
            }); */
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    puschaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

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

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
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
        if (this.state.loading) {
            orderSummary = (<Spinner />)
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
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actionType.ADD_INGREDIENT, ingredientName: ingName }),
        onIngredientRemoved: (ingName) => dispatch({ type: actionType.REMOVE_INGREDIENT, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));