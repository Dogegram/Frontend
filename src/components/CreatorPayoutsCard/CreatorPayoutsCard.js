import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast'
import { showAlert } from '../../redux/alert/alertActions';
import { selectCurrentUser, selectToken} from '../../redux/user/userSelectors';
import Button from '../../components/Button/Button';
import TextButton from '../Button/TextButton/TextButton';
import Divider from '../Divider/Divider';
import Card from '../Card/Card';
import { truncate } from 'lodash';

const CreatorPayoutsCard = ({currentUser, showAlert, token}) => {
  const [accountLink, setAccountLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [runOnlyOnes, setRunOnlyOnes] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState({message: 'Something went wrong?!?!?', status: true});

  useEffect(() => {
    document.title = 'Creator Payouts • Dogegram';
    if (currentUser) {
      console.log('what the fack are you doing here man,', currentUser.fullName);
    }

    const getAccountLink = async () => {

      try {
        const req = await axios(`${process.env.REACT_APP_BACKEND_URL}/api/payment/createConnectAccount`, { headers:{ 'Authorization': token }})
        const res = req;

        if(res.data.status === 'connected') {
          setConnected(true);
          toast.success('You have successfully connected your account!',            {
            style: {
              width: '500px',
              fontSize: 20,
            },
          })
        }
        
        if(res.status === 200){
          setAccountLink(res.data.url)
        } else if(res.status === 208){
          return true
        } else {
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
          getAccountLink(),
           {
             loading: ()=>{return (<b>Genrating Account Link...</b>)},
             success: ()=>{setLoading(false); return (<b>Request Completed!</b>)},
             error: (a)=>{console.log(a.message);return (<b>{a.message || error.message}</b>)},
           },
           {
            style: {
              width: '500px',
              fontSize: 20
            },
          }
         );
    const axiosreq = axios(`${process.env.REACT_APP_BACKEND_URL}/api/payment/createConnectAccount`, { headers:{ 'Authorization': token }}).then((res)=>{
      if(res.status === 200){
        setAccountLink(res.data.url)
      }
    })
  } else if(currentUser.stripe_account_id){
    setConnected(true)
 //   toast.success('You already have a connected account')
  }
  })

  useEffect(() => {
  } , [connected])

  return (
    <Fragment>
      <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
      <h3 className="heading-3 color-grey font-bold">
            Welcome {currentUser.fullName.split(' ')[0] || currentUser.name }, this is the Creator Payouts page. 
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            We hope you enjoy your stay here ;)
           </p>
           <h3 className="heading-3 color-grey font-bold">
            How it works:
          </h3>
          <p>
            So, we put a tips button on your profile page. 
            When you click it, you will be able to see a form 
            to put in your card details and the amount you want to tip.
            Then Stripe (our payment provider) will take care of the rest. 
            This was done to make receiving payments as easy as possible for you.
            And thanks to the tips button, you can tip people from your profile page.
            (also thanks to github copilot, who wrote this)
          </p>
          <p>
            Ok lets start your registration. (You need to have more than 1000 followers to be able to join the creator payouts program)
          </p>
          <Divider />
          <div className="form-container" style={{marginTop: '1rem'}}>
          {
           currentUser.creator_payout_enabled ?
           (<Link to="/settings/payouts-dash" className="form-link">
           <TextButton>
            Go to Simple Dash (by dogegram)
           </TextButton>
         </Link>) : loading ?
          ( 
            <p className="form-link">
            <Button>
              {error.status ? 'this will take a while, please wait... ' :  `Sadly you're not eligible for Creator Payouts 😥`}
            </Button>
          </p>
          ) : (
           <a href={accountLink} target="_blank" className="form-link">
           <Button>
            Lets start onboarding!
           </Button>
         </a>
          )
         
          } 
          </div>
          <p>
            If you have any questions, feel free to contact us at creator.payouts@dogegram.xyz 
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatorPayoutsCard);