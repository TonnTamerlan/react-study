import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';

import classes from './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 5
                }
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                touched: false,
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                touched: false,
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                touched: false,
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: '',
                validation: {}
            }
        },
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {

        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier];
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        this.setState({ loading: true });
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => this.setState({ loading: false }));
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let identifier in updatedOrderForm) {
            if (!updatedOrderForm[identifier].valid) {
                formIsValid = false;
            }
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    focusHandler(inputIdentifier) {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });
    }

    render() {

        const inputForms = [];
        for (let form in this.state.orderForm) {
            const orderForm = this.state.orderForm;
            inputForms.push(<Input
                key={form}
                invalid={!orderForm[form].valid}
                shouldValidate={orderForm[form].validation}
                elementType={orderForm[form].elementType}
                elementConfig={orderForm[form].elementConfig}
                value={orderForm[form].value}
                touched={orderForm[form].touched}
                focused={() => this.focusHandler(form)}
                changed={(event) => this.inputChangedHandler(event, form)} />)
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {inputForms}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = (<Spinner />);
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);