import React, { useEffect, useRef, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { createStructuredSelector } from 'reselect';
import Card from '../Card/Card';
import {
  selectCurrentUser,
  selectToken,
  selectUpdatingProfile,
} from '../../redux/user/userSelectors';
import { updateProfileStart } from '../../redux/user/userActions';
import { showAlert } from '../../redux/alert/alertActions';

import axios from 'axios';

import OtpInput from 'react-otp-input';


const Edit2FAAuthForm = ({
  currentUser,
  showAlert,
  token,
  updateProfileStart,
  updatingProfile,
}) => {

  const [setupStart, setSetupStart] = useState(false)
  const [showonboard, setshowonboard] = useState(true)
  const [QRimage, setQRimage] = useState('')
  const [key, setkey] = useState('')
  const [codes, setCodes] = useState([])
  const [natoCodes, setNatoCodes] = useState([])
  const [next1start, setNext1] = useState(false)
  const [otp, setOtp] = useState('')
  const [laststart, setlaststart] = useState(false)
  const [showNato, setshowNato] = useState(false)
  const [twofactor, settwofactor] = useState(false)
  


  const start = async (onORoff) => {
    if(onORoff  === 'on'){
    const request = await axios(process.env.REACT_APP_BACKEND_URL + '/api/user/2fa/join', {
      method: 'GET',
      headers:{
        'authorization':token
      }
    });
    const response = request.data;
    setQRimage(response.qr)
    setkey(response.secretKey)
    setCodes(response.recovery.codes)
    setNatoCodes(response.recovery.nato)
    setshowonboard(true)
  } else {
    const request = await axios(process.env.REACT_APP_BACKEND_URL + '/api/user/2fa/unset', {
      method: 'GET',
      headers:{
        'authorization':token
      }
    });
    const response = request.data;
    showAlert(response.message)
    setTimeout(()=>{
      window.location.reload()
    }, 3000)
  }
  }

  const next1check = async () => {
    showAlert("Checking the code!")
    try{
    const request = await axios(process.env.REACT_APP_BACKEND_URL + '/api/user/2fa/check', {
      method: 'POST',
      headers:{
        'authorization':token
      },
      data:{
        twofactorCode:otp
      }
    });
    const response = request.data;
    showAlert(response.message)

    setQRimage('')
    setkey('')


    setlaststart(true)
  } catch(err){
    const errdata = JSON.parse(err.request.response)
    showAlert(errdata.message)
  }

  }

  const twofactorset = async ()=>{
    try{
    const request = await axios(process.env.REACT_APP_BACKEND_URL + '/api/user/2fa/set', {
      method: 'GET',
      headers:{
        'authorization':token
      }
    });
    const response = request.data
    if(response.done===true){
      setshowonboard(false)
      setlaststart(false)
      setNext1(false)
      setshowNato(false)
      setCodes([])
      setNatoCodes([])
      settwofactor(true)
      showAlert(response.message)
    }
  } catch(err){
    const errdata = JSON.parse(err.request.response)
    showAlert(errdata.message)
  }
  }

  useEffect(() => {
    document.title = '2FA Auth Settings • Dogegram';
    //TODO @me delete this before deploying AND I FORGOT 

  }, []);

  return (
<Fragment>
      <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
        { showonboard ? (!next1start ?(
          <div>
            <img src={QRimage}></img>
            <h3>Scan this code with your 2FA app</h3>
            <h3>OR</h3>
            <h3>Type in this code: `{key}`</h3>
            <h3>Then click the next button below after scanning/typing the code</h3>
            <div className="button" onClick={()=>setNext1(true)}>
              <h3>Next =&gt;</h3>
            </div>
          </div>)
        : (!laststart ? (<div>
          <Card>
            <h2 style={{margin:'20px'}} >Enter the 2FA code to confirm</h2>
          <OtpInput
        value={otp}
        onChange={(code)=>{
          setOtp(code)
        }}
        numInputs={6}
        separator={<span>-</span>}
        placeholder="PLEASE"
        containerStyle={{marginTop:'20px'}}
        inputStyle={{
          width: '30px ',
          height: '30px',
          margin: '0 1rem',
          borderRadius: '4px',
          border:' 1px solid rgba(0, 0, 0, 0.3)',}}
      />
      <div className="button" style={{margin:'20px'}} onClick={()=>next1check()}>
        <h3>Check the code!</h3>
      </div>
          </Card>
        </div>) : (
          <div>
            <h2>Show recovery codes (If you ever lose your devices, this would be your last resort, keep them safe)</h2>
            <div style={{backgroundColor: '#fafafa'}}>
            {showNato ? natoCodes.map((item, idx)=>(
          <h2 className="heading-2 color-grey bold">{item}</h2>
          )) : codes.map((item, idx) => (
          <h2 className="heading-2 color-grey bold">{item}</h2>
        ))} 
        </div>
        <div className="button" onClick={()=>setshowNato(showNato ? false : true)}><h3>{ showNato ? "Lets better go back to that" : "Show easy to remember text (you should probably save this somewhere tho)" }</h3></div>
        <div className="button" style={{marginTop: 10}} onClick={()=>twofactorset(true)}><h3>Finish this setup and turn on 2FA!</h3></div>
          </div>
        ) )
        ) : (
          <div>
      <h1 className="heading-1 color-grey font-bold">
            {currentUser.twofactor || twofactor ? '2FA turned on, yay!' : 'Set up 2FA for your account and secure your account'}
          </h1>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem', margin:20 }}
            className="color-grey"
          >
            {currentUser.twofactor || twofactor ? 'need to turn off 2FA? here\'s a button below.' : 'If you want to start the setup then get ready with a mobile device with a 2FA supporting app such as Google authenticator.'}
            
           </p>
          <div className="button" onClick={()=> start(currentUser.twofactor || twofactor ? 'off' : 'on')}>
            <h2>
            {currentUser.twofactor || twofactor ? 'turn off 2FA :)' : 'Click here to start set up'}
            </h2>
          </div></div>
        )}
      </Card>
    </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Edit2FAAuthForm);
