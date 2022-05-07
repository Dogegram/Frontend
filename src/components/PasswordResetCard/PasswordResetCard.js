import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import toast from 'react-hot-toast'
import OtpInput from 'react-otp-input';
import { forgetPassword } from '../../services/authenticationServices';

import { passwordResetStart } from '../../redux/user/userActions';
import { selectError, selectFetching } from '../../redux/user/userSelectors';

import {
  validateEmail
} from '../../utils/validation';

import Button from '../Button/Button';
import TextButton from '../Button/TextButton/TextButton';
import Divider from '../Divider/Divider';
import Card from '../Card/Card';
import FormInput from '../FormInput/FormInput';

const PasswordResetCard = ({ passwordResetStart, error, fetching }) => {
  const validate = (values) => {
    const errors = {};
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    return errors;
  };
  const [otp, setOtp] = useState('');
  const [codeInputVisible, setCodeInputVisible] = useState('');

  var done = false;
  var idempotencyKey = '';

  const nextStep = async (data)=>{
    console.log(data)
    if(!data){
      alert('Please enter your email address')
      return
    }

    var resdata = await forgetPassword(
      data.email
    ).catch((err) => {
      
      console.log(err)
      toast.error(err.message, { icon: '🤦🏻‍♂️', 
      style: {
        width: '500px',
        fontSize: 20,
      },});
    })

    if(resdata.success){
      setCodeInputVisible(true)
      toast.success('Please check your email, we sent a nice email to your inbox. Should arive any second now!', { style: {
        width: '500px',
        fontSize: 20,
      },});
    }

    toast.error(`Uh um, acctually we didn't finish this feature so probably 
    next week you would see this work, until then contact passreset@dogegram.xyz 
    and we would try to help.`,
    { style: {
    width: '500px',
    fontSize: 20
  }})
    
  }
  

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (values) => nextStep(values),
  });

  return (
    <Fragment>
      <Card className="form-card">
        <h1 className="heading-logo text-center">Dogegram</h1>
        <h2
          style={{ fontSize: '1.7rem' }}
          className="heading-2 color-grey text-center"
        >
          Password Reset
        </h2> 
        {Object.keys(formik.errors).map((field) => {
          if (formik.touched[field]) {
            return (
              <p
                className="error"
                key={formik.errors[field]}
                style={{ marginTop: '0' }}
              >
                {formik.errors[field]}
              </p>
            );
          }
        })}
        {!codeInputVisible ? (
        <form className="form-card__form" onSubmit={formik.handleSubmit}>
          <FormInput
            name="email"
            fieldProps={formik.getFieldProps('email')}
            valid={formik.touched.email && !formik.errors.email}
            placeholder="Email address"
          />
          <Button
            loading={fetching}
            disabled={
              Object.keys(formik.touched).length === 0 ? true : !formik.isValid
            }
          >
            Reset Password
          </Button>
          <p></p>
        </form>
        ) : (
          <Fragment>
            <h2 className="heading-2 color-grey text-center">
              Enter the code you received in your email
            </h2>
            <OtpInput
        value={otp}
        onChange={(code)=>{
          setOtp(code)
        }}
        numInputs={6}
        separator={<span>-</span>}
        placeholder="PLEASE"
        containerStyle={{marginTop:'20px', marginBottom:'20px'}}
        inputStyle={{
          width: '30px ',
          height: '30px',
          margin: '0 1rem',
          borderRadius: '4px',
          border:' 1px solid rgba(0, 0, 0, 0.3)',}}
      />
      <Button onClick={()=>{
        nextStep({email:formik.values.email, otp}) 
      }
      }>Submit</Button>
          </Fragment>
        )}
        <p className="error">
          
        </p>
        <p className="heading-5 color-grey">
          We would send you a password reset email with a code to reset your password, please follow it and reset your password. It would be valid for 1hr after sending.
        </p>
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
            Remember your password?
          </h4>
          <Link to="/login">
            <TextButton medium blue bold>
              Log in
            </TextButton>
          </Link>
        </section>
      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  passwordResetStart: (email) =>
    dispatch(forgetPassword(email)),
});

const mapStateToProps = createStructuredSelector({
  error: selectError,
  fetching: selectFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetCard);
