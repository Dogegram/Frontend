import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { createStructuredSelector } from 'reselect';
import Card from '../Card/Card'
import {
  selectCurrentUser,
  selectToken,
  selectUpdatingProfile,
} from '../../redux/user/userSelectors';
import { updateProfileStart } from '../../redux/user/userActions';
import { showAlert } from '../../redux/alert/alertActions';
import Checkout from '../Checkout/Checkout'

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_live_51JAooySJ2Um64gtlmEZ6XzEL9plgBEyT9QdduTPL3dfVvKtI5gaxJVb0nDE91z3Zj1fIRut6YYAfKCUJ3kDxfNts00z57peEpv');

//deprecated adwallet
const AdWallet = ({
  currentUser,
  showAlert,
  token,
}) => {
  const [cs, setCS] = useState('')
  const [loading, setLoading] = useState(false)
  const [deposit, setDeposit] = useState(0)
  const [currency, setCurrency] = useState('$')
  
    
  useEffect(() => {
    document.title = 'AdWallet • Dogegram';
    const payment_intent_client_secret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )
    if(payment_intent_client_secret){
      setCS(payment_intent_client_secret)
      setLoading(true)
    }
  }, []);
  const mkcs = async () => {
    if(deposit % 1 != 0){
      return showAlert(`The current value is not an integer or has a decimal`)
    }
    var response = axios(`${process.env.REACT_APP_BACKEND_URL}/api/payment/createSession/${deposit}`, { headers:{ 'Authorization': token }}).then(function(responseJson) {
      console.log(responseJson)
      var clientSecret = responseJson.data.client_secret;
      setCS(clientSecret)
      setLoading(true)
      // Call stripe.confirmCardPayment() with the client secret.
    }).catch((err)=>{
      if(err.response.status === 400){
        return showAlert(`The current value was denied by the server.`)
      } else if(err.response.status === 429){
        return showAlert(`Too Many Requests. Our payment provider Stripe will be unhappy about that so please stop.`)
      }
    });

  }
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#f2b32c',
    },
  };
  const options = {
    clientSecret: cs,
    appearance,
  };


  

  return (
    <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
    <h2>Current Ad wallet balance: ₹{currentUser.adwallet ? currentUser.adwallet : 0}</h2>
    <h2>To promote a post contact adpartners@dogegram.xyz, and we will reach to you ASAP. Please fill the wallet to at least ₹50.</h2>
    {loading ? (
    <Elements options={options} stripe={stripePromise}>
        <Checkout cs={cs}/>
    </Elements>
    ) : (<form onSubmit={(e)=>{e.preventDefault(); mkcs()}}>
    <FormInput placeholder={`Deposit (in INR)`} required onChange={(e)=>setDeposit(e.target.value)}/>
    <Button>Start Checkout</Button>
    </form>) }
    <h4>If AdWallet Ballence shows less that what you accepted then you should refresh the page and check again, 
    if still same, please contact disputes.ads@dogegram.xyz</h4>
    </Card>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateProfileStart: (authToken, updates) =>
    dispatch(updateProfileStart(authToken, updates)),
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  updatingProfile: selectUpdatingProfile,
});

export default connect(mapStateToProps, mapDispatchToProps)(AdWallet);
