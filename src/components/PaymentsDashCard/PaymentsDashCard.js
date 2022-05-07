import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast'
import { showAlert } from '../../redux/alert/alertActions';
import { selectCurrentUser, selectToken} from '../../redux/user/userSelectors';
import Button from '../Button/Button';
import TextButton from '../Button/TextButton/TextButton';
import Divider from '../Divider/Divider';
import Card from '../Card/Card';
import Switch from "react-switch";


const PaymentsDashCard = ({currentUser, showAlert, token}) => {
  const [accountLink, setAccountLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [runOnlyOnes, setRunOnlyOnes] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState({message: 'Something went wrong?!?!?', status: true});
  const [balance, setBalance] = useState('Loading...');
  const [pending, setPending] = useState('Loading...');
  const [enabled, setEnabled] = useState(currentUser.payments_enabled != undefined ? currentUser.payments_enabled : true);

  useEffect(() => {
    document.title = 'Payments Dash • Dogegram';
    if (currentUser) {
      console.log('what the fack are you doing here man,', currentUser.fullName);
    }

    const getAccountInfo = async () => {

      try {
        const req = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/payout/fetchUserData/finData`, { headers:{ 'Authorization': token }})
        const res = req;

        if(res.data.balance !== undefined && res.data.pending !== undefined) {
          setBalance(res.data.balance)
          setPending(res.data.pending)
        }
        
        if(res.status != 200){
          setError({message: req.data.error || req.data.message, status: false})
          throw new Error(res.data.error || res.data.message)
        }
    } catch (err) {
        setError(err.message || err.response.data.error )
        throw new Error(err.message || err.response.data.error )
    }
  }
    
      if(!currentUser.stripe_account_id && runOnlyOnes === false){
        setRunOnlyOnes(true)
        toast.promise(
          getAccountInfo(),
           {
             loading: ()=>{return (<b>Loading Info...</b>)},
             success: ()=>{setLoading(false); return (<b>Got the data!</b>)},
             error: (a)=>{console.log(a.message);return (<b>{a.message || error.message}</b>)},
           },
           {
            style: {
              width: '500px',
              fontSize: 20
            },
          }
         );

  }
  })
  

  useEffect(() => {
    //call the api to make the chnage
    const changePaymentStatus = async () => {
      try {
        const req = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/payout/changePaymentStatus`, {
          method: 'POST',
          headers: {
            'Authorization': token
          },
          data: {
            enabled: enabled
          }
        })
        const res = req.data;
        if (res.status === 200) {
          showAlert(res.message)
          setEnabled(!enabled)
        } else {
          showAlert(res.message)
        }
      } catch (err) {
        showAlert(err.message)
      }
    }
    changePaymentStatus()
  } , [enabled])

  return (
    <Fragment>
      <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
      <h3 className="heading-3 color-grey font-bold">
            Welcome {currentUser.fullName.split(' ')[0] || currentUser.fullName }, this is the Payments Dashboard. 
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            Heres your earning below.
           </p>
           <h3 className="heading-3 color-grey font-bold">
            Earnings 
          </h3>
          <h3>
            {balance}
          </h3>
          <h3 className="heading-3 color-grey font-bold">
            Pending Balance
          </h3>
          <h3>
            {pending}
          </h3>
          <h3 className="heading-3 color-grey font-bold">
            Turn Payments On/Off
          </h3>
          <h3>
            <Switch onChange={(e)=>setEnabled(e)} checked={enabled} />
          </h3>
          <p>
            this is just basic stuff, you can find much more info on the Stripe Dashboard. Login 
            in it with the username and password you had set up when you were onboarding.
          </p>
          <Divider />
          <div className="form-container" style={{marginTop: '1rem'}}>

           <a href="https://dashboard.stripe.com/dashboard" target="_blank" className="form-link">
           <Button>
            Go to Stripe Dashboard
           </Button>
         </a>
          </div>
          <p>
            If you have any questions, feel free to contact us at payments@dogegram.xyz 
            and also if you don't know what you are doing, then please don't do anything on your 
            Stripe account else if you get banned, you will be pretty much screwed.
          </p>
      </Card>
    </Fragment>
  );
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
});

const mapDispatchToProps = (dispatch) => ({
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsDashCard);