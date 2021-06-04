import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  selectCurrentUser,
} from '../../redux/user/userSelectors';
 
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

const BirthdayUpdateCard = ({ signUpStart, error, fetching,  currentUser
}) => {

  const parseDate = ()=>{
    let date = currentUser.birthday;
    date = date.replace("T00:00:00.000Z", "")
    console.log(date);
    return date;
    }
  return (
    <Fragment>
      <Card className="form-card" style={{display: 'flex', alignItems: 'center', width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'center'}}>
      <h3 className="heading-3 color-grey font-bold">
            We don't think living beings need to change birthdays.
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            Are you a special being? Does your birthday change? <br/> If it does then email us at <a className="heading-5 link" href="mailto:birthday@dogegram.xyz">birthday@dogegram.xyz</a> with Reason and updated birthday. 
           </p>
           <h3 className="heading-3 color-grey font-bold">
            Your Current Birthday: {parseDate()}
          </h3>

      </Card>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  passwordResetStart: (email) =>
    dispatch(forgetPassword(email)),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  error: selectError,
  fetching: selectFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(BirthdayUpdateCard);
