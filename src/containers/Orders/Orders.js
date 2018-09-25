import React, { Component } from 'react';
import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(req => {
                const fetchedOrders = [];
                for (let key in req.data) {
                    fetchedOrders.push(
                        {
                            ...req.data[key],
                            id: key
                        }
                    );
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => {
                    return <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                })}
            </div >
        );
    }

}

export default withErrorHandler(Orders, axios);