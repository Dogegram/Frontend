import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { showAlert } from '../../redux/alert/alertActions';

import { connect } from 'react-redux';

function CheckoutForm(cs, doneMessage) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const successMessage = doneMessage.doneMessage
  useEffect(() => {
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
    }, 2000)
    console.log(successMessage)
    if (!stripe) {
      return;
    }

    const clientSecret = cs.cs


    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(successMessage ? successMessage : "Payment succeeded!");
          
          setIsDone(true)
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage(undefined);
          break;
        default:
          setMessage("Something went wrong.");
          break; 
      }
    });
  }, [stripe]);

  useEffect(()=>{
    showAlert(message)
  }, [message])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.location.href,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div>
    { isDone ? (
      <div>
        <h2 className="h2 bold">
          Payment Done!
        </h2>
      </div>
     ) : (
     <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit" style={{"boxSizing":"border-box","wordWrap":"break-word","font":"inherit","margin":"0","overflow":"visible","textTransform":"none","WebkitAppearance":"button","WebkitFontSmoothing":"antialiased","fontFamily":"Arial, sans-serif","border":"0","marginTop":"24px","padding":"12px 16px","fontSize":"16px","fontWeight":"600","cursor":"pointer","display":"block","transition":"all 0.2s ease","width":"100%","background":"rgb(242, 179, 44)","borderRadius":"5px","color":"black"}}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
    </form>)}
    {message && <div id="payment-message">{message}</div>}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

export default connect(mapDispatchToProps)(CheckoutForm);
