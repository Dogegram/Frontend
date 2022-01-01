import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';
import axios from 'axios';
import toast from 'react-hot-toast';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from '../../components/Checkout/Checkout';


const TipsPage = () => {

  const token = localStorage.getItem('token');

  const { username, sAccID } = useParams();
  const [ text, setText ] = useState('');

  useEffect(() => {
    document.title = `Pay to ${username} • Dogegram`;
    const payment_intent_client_secret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )
    if(payment_intent_client_secret){
      setCS(payment_intent_client_secret)
      setLoading(true)
    }
  }, []);

  const [tip, setTip] = useState('');
  const [cs, setCS] = useState('');
  const [loading, setLoading] = useState(false);
  const stripePromise = loadStripe('pk_live_51JAooySJ2Um64gtlmEZ6XzEL9plgBEyT9QdduTPL3dfVvKtI5gaxJVb0nDE91z3Zj1fIRut6YYAfKCUJ3kDxfNts00z57peEpv',
  {
    stripeAccount: sAccID
  }
  );

  

  const createTip = async () => {
    console.log('create tip');
    var response = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/createTipsSession/${username}/${tip}`, { message: text }, { headers:{ 'Authorization': token }}).then(function(responseJson) {
      console.log(responseJson)
      var clientSecret = responseJson.data.client_secret;
      setCS(clientSecret)
      setLoading(true)
      toast("Tip session created successfully, please wait for the form to load", { icon: "success" });
      // Call stripe.confirmCardPayment() with the client secret.
    }).catch((err)=>{
      if(err.response.status === 400){
        console.log(err.response.data.message)
        return toast.error(err.response.data.error)
      } else if(err.response.status === 429){
        return toast.error(`Too Many Requests. Our payment provider Stripe will be unhappy/angry about that so please stop.`)
      }
    });
  }

  const setTipValue = (e) => {
    console.log(typeof e.target.value)
 if(e.target.value.match(/^[0-9]+$/) || e.target.value === ''){
    setTip(e.target.value)
 } else {
   toast.error("Please enter a valid tip amount")
 }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    createTip();
    console.log(tip);
  }

    return (
    <Fragment className="tips-page">
        <Card className="payments-card">
        <div
      style={{
        gridColumn: 'center-start / center-end',
        textAlign: 'center',
        padding: '0 2rem',
      }}
    >
      <h1 className="heading-1">Lets Tip Your fav creator: @{username.toString()} </h1>
      <h3 className="heading-3 font-medium">
       You are helping {username.toString()} create more fav videos you like and others do to! <br/>
      </h3>
      <br/>
      {loading ? (
    <Elements options={options} stripe={stripePromise}>
        <Checkout cs={cs}  />
    </Elements>
      ) : (
<form className="form">
        <FormInput style={{textAlign:'center'}} placeholder="Amount you want to tip (in INR)" value={tip} onChange={(e)=>setTipValue(e)}/>
        <br/>
        <textarea className="form-group__whisperinput" placeholder="Your Message to creator" value={text}  onChange={(event) =>{setText(event.target.value)}}  />
        <Button className="btn-primary" onClick={(e)=>handleSubmit(e)}>Bring up the card details form!</Button>
      </form>
    )}
      <br/>
      <h5>Card payments are handeld by our parter payment processor Stripe Inc. Formally known as Stripe.
           We don't store card details. <br/> All money stuff is handeled by Stripe as per industry standards.
      </h5>
    </div>
        </Card>
    </Fragment>)
}

export default TipsPage;
