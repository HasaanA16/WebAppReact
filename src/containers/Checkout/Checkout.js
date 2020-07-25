import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import classes from './ContactData/ContactData.css';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = [];
        let price= 0;
        for(let param of query.entries())
        {   
            if( param[0]=== 'price')  
             {
                 price= param[1] ;
            }
        
        else {
            ingredients[param[0]] = + param[1];
            }
        }
        this.setState({ingredients:ingredients, totalPrice: price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();   //press cancel and go back to previous page
    }

    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data'); 
    }
    render() {
        return (
            <div className={classes.ContactData}>
                <CheckoutSummary ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}/>
                <Route path={this.props.match.path + '/contact-data'}  // current path + /contact data
                render= {() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/>)}/>
            </div>
        );
    }
}

export default Checkout;