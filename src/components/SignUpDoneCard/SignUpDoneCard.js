import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';

import Confetti from 'react-confetti';

import Card from '../Card/Card';
import TextButton from '../Button/TextButton/TextButton';

const SignUpDoneCard = ({ signUpStart, error, fetching, done }) => {
  return (
    <Fragment>
      <Confetti width={window.innerWidth} height={window.innerHeight}/>
      <Card className="form-card">
      <h1 className="heading-logo text-center">Dogegram</h1>
        <h2 className="h2 bold">
          Its Done!!!!
        </h2>
        <br/>
        <h2 className="h2 bold">
          Now just check your email to get the verification email! (Don't forget to check the spam folder)
        </h2>
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
            Verifed?
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


export default SignUpDoneCard;
