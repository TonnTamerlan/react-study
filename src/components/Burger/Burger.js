import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el)=> {return arr.concat(el)}, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = (<p>Add ingredients, mother fuck!</p>)
    }

    return (
        <div className={classes.Burger}>
           <BurgerIngredient key="bread-top" type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient key="bread-bottom" type="bread-bottom"/>
        </div>
    );
};

export default burger;