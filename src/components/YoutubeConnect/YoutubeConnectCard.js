import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  selectCurrentUser,
} from '../../redux/user/userSelectors';
 
import { GoogleLogin } from 'react-google-login';

import { selectError, selectFetching, selectToken } from '../../redux/user/userSelectors';

import {
  applyCreatorConnect
} from '../../services/userService';

import Button from '../Button/Button';
import TextButton from '../Button/TextButton/TextButton';
import Divider from '../Divider/Divider';
import Card from '../Card/Card';
import FormInput from '../FormInput/FormInput';
import { showAlert } from '../../redux/alert/alertActions';

const YoutubeConnectCard = ({ error, fetching,  currentUser, token, showAlert
}) => {

  var {youtuber, email} = currentUser

  const [errorG, setErrorG] = useState(false)

  console.log(token)

  const getGoogleData =async (data)  =>{
    const atoken = data.accessToken
    const req = await applyCreatorConnect(token,atoken);
    console.log(req)
    const res = req
    showAlert(res.message)

  }


  return (
    <Fragment>
      <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
      {youtuber ? (
        <div>
          <h3 className="heading-3 color-blue font-bold">
            Whoo Hooo!! You got the badge and its live on your profile page!!!
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            If you want to join our creator partner beta program and have over 100,000 subscribers on your Youtube(TM) channel, you can mail us for that on creator.program@dogegram.xyz
          </p>
          <h6 className="color-grey">We are not assosiated/affiliated with Youtube in anyway. Youtube is a trademark from Google LLC.</h6>
        </div>
      ) : (<div><h3 className="heading-3 color-grey font-bold">
            Are you are content creator for youtube and have over 100 subscribers?
          </h3>
          <p
            style={{ fontSize: '1.5rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            You have come to the right place, connect your youtube account and get a content creator badge on your profile with many other perks.</p> <br/>
            <h4 className="color-grey">(Google Auth not working or disabled? try unblocking our site for third-party cookies from the top-right corner of the address bar on Chrome. If on any other browser, then google it, how to.)</h4>
           
           <h6 className="color-grey">We are not assosiated/affiliated with Youtube in anyway. Youtube is a trademark from Google LLC.</h6>

          <br/>
          <GoogleLogin
    clientId="526924008809-ji2tsni60f9tsrrlk301g0ka46sejufb.apps.googleusercontent.com"
    buttonText="Connect Your Google Account"
    onSuccess={(res)=>getGoogleData(res)}
    onFailure={(res)=>{showAlert(res.error === 'idpiframe_initialization_failed' ? 'Please enable 3rd-party-cookies so we can load google sign in' :   res.details); setErrorG(true)}}
    scope="https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly"
    cookiePolicy={'single_host_origin'}
    disabled={errorG}

  />
  </div>) }

      </Card>
    </Fragment>
  );
};


const mapDispatchToProps = (dispatch) => ({
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken
});

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeConnectCard);
