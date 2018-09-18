import React, { Component } from 'react'
// import PropTypes from 'prop-types'

import Auxwrap from '../../hoc/Auxwrap'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    render(){

        return (
            <Auxwrap>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls />
            </Auxwrap>
        );
    }
}

export default BurgerBuilder;