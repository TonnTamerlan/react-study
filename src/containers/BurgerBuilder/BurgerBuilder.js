import React, { Component } from 'react'

import axios from '../../axios-orders'

import Auxwrap from '../../hoc/Auxwrap/Auxwrap'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log('BurgerBuilder props', this.props);
        this.reqIntercetor = axios.get('/ingredients.json')
            .then(resp => {
                this.setState({ ingredients: resp.data })
            })
            .catch(err => {
                this.setState({ error: true });
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key]).reduce((sum, el) => sum + el, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice,
            });
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState(
            {
                ingredients: updatedIngredients,
                totalPrice: updatedTotalPrice
            });
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    puschaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Auxwrap>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        isPurchasable={(this.state.purchasable)}
                        purchase={this.purchaseHandler}
                    />
                </Auxwrap>);
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    canceled={this.puschaseCancelHandler}
                    continued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);