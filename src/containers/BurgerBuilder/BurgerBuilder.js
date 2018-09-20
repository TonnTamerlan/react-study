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
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
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
        // alert('Your purchase continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: 'Alexey Kopylov',
                adress: {
                    street: 'Yakuba Kolasa 23a',
                    zipCode: '12331',
                    country: 'ukraine'
                },
                email: 'test@email.com',
                deliveryMethod: 'fastest'
            }
        }
        this.setState({loading: true})
        axios.post('/orders.json', order)
            .then(response => {
                if(response.status === 200) {
                    this.setState({loading: false, purchasing: false});
                }
            })
            .catch(error=>this.setState({loading: false, purchasing: false}));
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = (
        <OrderSummary 
            ingredients={this.state.ingredients} 
            canceled = {this.puschaseCancelHandler}
            continued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
            />
        );

        if (this.state.loading){
            orderSummary = (<Spinner />)
        }

        return (
            <Auxwrap>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.puschaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    isPurchasable={(this.state.purchasable)}
                    purchase={this.purchaseHandler}
                />
            </Auxwrap>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);