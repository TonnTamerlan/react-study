import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];
 

const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => <BuildControl 
                    ingredientAdded ={() => props.ingredientAdded(control.type)}
                    ingredientRemoved={()=>props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                    label={control.label} 
                    key={control.label}/>)}
        <button 
            className={classes.OrderButton}
            disabled={!props.isPurchasable}
            onClick={props.purchase}>{props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
);

export default buildControls;