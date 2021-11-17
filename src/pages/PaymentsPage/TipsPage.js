import React, { Fragment } from 'react';

import Card from '../../components/Card/Card';
import { Link } from 'react-router-dom';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';
import FormInput from '../../components/FormInput/FormInput';
import Button from '../../components/Button/Button';

const TipsPage = () => {
    return (<Fragment className="tips-page">
        <Card className="payments-card">
        <div
      style={{
        gridColumn: 'center-start / center-end',
        textAlign: 'center',
        padding: '0 2rem',
      }}
    >
      <h1 className="heading-1">Lets Tip Your fav creator</h1>
      <h3 className="heading-3 font-medium">
       You are helping him/her create more fav videos you like and others do to! <br/>
      </h3>
      <br/>
      <form className="form">
        <FormInput placeholder="Amount you want to tip (in INR)"/>
        <br/>
        <Button className="btn-primary">Bring up the card details form!</Button>
      </form>
      <br/>
      <h5>Card payments are handeld by our parter payment processor Stripe Inc. Formally known as Stripe.
           We don't store card details. <br/> All money stuff is handeled by Stripe as per industry standards.
      </h5>
    </div>
        </Card>
    </Fragment>)
}

export default TipsPage;
