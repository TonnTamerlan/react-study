import React, {Component} from 'react';

import Auxwrap from '../../../hoc/Auxwrap/Auxwrap';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(key => {
                return (
                    <li key={key}>
                        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
                    </li>)
            })

        return (
            <Auxwrap>
                <h3>Your order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.canceled} btnType="Danger">CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
            </Auxwrap>
        )
    };
};

export default OrderSummary;