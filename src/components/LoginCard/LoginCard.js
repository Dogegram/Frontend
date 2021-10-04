import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { signInStart } from '../../redux/user/userActions';

import {
  selectError,
  selectFetching,
  selectCurrentUser,
} from '../../redux/user/userSelectors';

import OtpInput from 'react-otp-input';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import Divider from '../Divider/Divider';
import TextButton from '../Button/TextButton/TextButton';
import Card from '../Card/Card';

const LoginCard = ({
  signInStart,
  error,
  fetching,
  currentUser,
  onClick,
  modal,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [is2FA, setIs2FA] = useState(false);
  const [invoke, setInvoke] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    signInStart(email, password, otp);
  };

  currentUser && onClick();


  if(error === '2FA' && invoke === false){
    setInvoke(true)
    setIs2FA(true)
  }

  console.log(error)

  return (
    <div
      className="login-card-container"
      style={
        modal
          ? {
              padding: '2rem',
            }
          : {}
      }
    >
      <Card className="form-card">
        <h1 className="heading-logo text-center">Dogegram</h1>
        {is2FA ? (
          
          <form
          onSubmit={(event) => handleSubmit(event)}
          className="form-card__form"
        >            
        <h2>Open your 2FA app and put here the code</h2>
       <OtpInput
        value={otp}
        onChange={(code)=>{
          console.log(otp)
          setOtp(code)
        }}
        numInputs={6}
        separator={<span>-</span>}
        placeholder="PLEASE"
        containerStyle={{margin:'20px'}}
        inputStyle={{
          width: '30px ',
          height: '30px',
          margin: '0 1rem',
          borderRadius: '4px',
          border:' 1px solid rgba(0, 0, 0, 0.3)',}}
      />
          <Button disabled={fetching} loading={fetching}>
            Login!
          </Button>
          </form>
        ) : (
          <form
          onSubmit={(event) => handleSubmit(event)}
          className="form-card__form"
        >
          <FormInput
            placeholder="Username or email address"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button disabled={fetching} loading={fetching}>
            Log In
          </Button>
        </form>
)        }
        {error && (
          <p style={{ padding: '1rem 0' }} className="error">
            { error === '2FA' ? '' : error }
          </p>
        )}
        <Link to="/passwordreset" style={{ marginTop: '1.5rem' }} onClick={() => onClick && onClick()}>
            <TextButton style={{ marginTop: '1.5rem' }} medium blue bold small>
              Forget Password?
            </TextButton>
          </Link>
      </Card>
      <Card>
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <h4 style={{ marginRight: '5px' }} className="heading-4 font-thin">
            Don't have an account?
          </h4>
          <Link to="/signup" onClick={() => onClick && onClick()}>
            <TextButton medium blue bold>
              Sign up
            </TextButton>
          </Link>
        </section>
      </Card>
    </div>
  );
};

LoginCard.propTypes = {
  signInStart: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (email, password, otp) => dispatch(signInStart(email, password, null, otp)),
});

const mapStateToProps = createStructuredSelector({
  error: selectError,
  fetching: selectFetching,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCard);
