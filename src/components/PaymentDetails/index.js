import { useState, useEffect } from 'react';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';

import { CountryDropdown } from 'react-country-region-selector';
import { apiInstance } from '../../Utils';

import { selectCartTotal, selectCartItemsCount } from '../../redux/Cart/cart.selectors.js';
import { clearCart } from '../../redux/Cart/cart.actions';
import { createStructuredSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import './styles.scss';





const initialAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
};


const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount
})


const PaymentDetails = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { total, itemCount } = useSelector(mapState);

  const dispatch = useDispatch();
  const history = useHistory();

  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState });
  const [billingAddress, setBillingAddress] = useState({ ...initialAddressState });
  const [recipientName, setRecipientName] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');



  // If ClearCart function is successful, then we want to redirect the user to the homepage
  useEffect(() => {
    if (itemCount < 1) {
      history.push('/');
    }
  }, [itemCount])



  const handleShipping = e => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
  };


  const handleBilling = e => {
    const { name, value } = e.target;
    setBillingAddress({
      ...shippingAddress,
      [name]: value
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const cardElement = elements.getElement('card');

    if (
      !shippingAddress.line1 || !shippingAddress.city ||
      !shippingAddress.state || !shippingAddress.postal_code ||
      !shippingAddress.country || !billingAddress.line1 || 
      !billingAddress.city || !billingAddress.state ||
      !billingAddress.postal_code || !billingAddress.country ||
      !recipientName || !nameOnCard
    ) {
      return;
    }

    // MAKE API CALL TO MAKE PAYMENTS AT BACKEND
    apiInstance.post('/payments/create', {
      amount: total * 100,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress
        }
      }
    }).then(({ data: clientSecret }) => {
      stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            ...billingAddress
          }
        }
      }).then(({ paymentMethod }) => {
        stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id
        })
        .then(({ paymentIntent }) => {   // paymentIntent - this include the details about the transaction
          // console.log(paymentIntent)
          dispatch(clearCart());

        })

      })

    });

  };


  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px'
      }
    },
    hidePostalCode: true
  };


  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>

        <div className="group">
          <h2>
            Shipping Address
          </h2>

          <FormInput 
            type="text"
            placeholder="Recipient Name"
            name="recipientName"
            value={recipientName}
            handleChange={e => setRecipientName(e.target.value)}
            required
          />

          <FormInput 
            type="text"
            placeholder="Line 1"
            name="line1"
            value={shippingAddress.line1}
            handleChange={e => handleShipping(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="Line 2"
            name="line2"
            value={shippingAddress.line2}
            handleChange={e => handleShipping(e)}
          />
          <FormInput 
            type="text"
            placeholder="City"
            name="city"
            value={shippingAddress.city}
            handleChange={e => handleShipping(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="State"
            name="state"
            value={shippingAddress.state}
            handleChange={e => handleShipping(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={shippingAddress.postal_code}
            handleChange={e => handleShipping(e)}
            required
          />

          <div className="formRow checkoutInput">
            <CountryDropdown 
              required
              valueType="short"
              value={shippingAddress.country}
              onChange={val => handleShipping({
                target: {
                  name: 'country',
                  value: val
                }
              })}
            />
          </div>
        </div>


        <div className="group">
          <h2>
            Billing Address
          </h2>
          <FormInput 
            type="text"
            placeholder="Cardholder Name"
            name="nameOnCard"
            value={nameOnCard}
            handleChange={e => setNameOnCard(e.target.value)}
            required
          />

          <FormInput 
            type="text"
            placeholder="Line 1"
            name="line1"
            value={billingAddress.line1}
            handleChange={e => handleBilling(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="Line 2"
            name="line2"
            value={billingAddress.line2}
            handleChange={e => handleBilling(e)}
          />
          <FormInput 
            type="text"
            placeholder="City"
            name="city"
            value={billingAddress.city}
            handleChange={e => handleBilling(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="State"
            name="state"
            value={billingAddress.state}
            handleChange={e => handleBilling(e)}
            required
          />
          <FormInput 
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={billingAddress.postal_code}
            handleChange={e => handleBilling(e)}
            required
          />
          <div className="formRow checkoutInput">
            <CountryDropdown 
              required
              valueType="short"
              value={billingAddress.country}
              onChange={val => handleBilling({
                target: {
                  name: 'country',
                  value: val
                }
              })}
            />
          </div>
        </div>



        <div className="group">
          <h2>
            Card Details
          </h2>

          <CardElement 
            options={configCardElement}
          />
        </div>

        <Button type="submit">PAy Now</Button>

      </form>
    </div>
  )
}

export default PaymentDetails
