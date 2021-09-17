import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { createStructuredSelector } from 'reselect';

import {
  selectCurrentUser,
  selectToken,
  selectUpdatingProfile,
} from '../../redux/user/userSelectors';
import { updateProfileStart } from '../../redux/user/userActions';
import { showAlert } from '../../redux/alert/alertActions';

import {
  validateEmail,
  validateFullName,
  validateUsername,
  validateBio,
  validateWebsite,
} from '../../utils/validation';

import Avatar from '../Avatar/Avatar';
import FormInput from '../FormInput/FormInput';
import FormTextarea from '../FormTextarea/FormTextarea';
import Button from '../Button/Button';
import SettingsForm from '../SettingsForm/SettingsForm';
import SettingsFormGroup from '../SettingsForm/SettingsFormGroup/SettingsFormGroup';
import ChangeAvatarButton from '../ChangeAvatarButton/ChangeAvatarButton';

const EditAuthForm = ({
  currentUser,
  showAlert,
  token,
  updateProfileStart,
  updatingProfile,
}) => {
  const validate = (values) => {
    const errors = {};
    const emailError = validateEmail(values.email);
    if (emailError) errors.email = emailError;

    const fullNameError = validateFullName(values.fullName);
    if (fullNameError) errors.fullName = fullNameError;

    const usernameError = validateUsername(values.username);
    if (usernameError) errors.username = usernameError;

    const bioError = validateBio(values.bio);
    if (bioError) errors.bio = bioError;

    const websiteError = validateWebsite(values.website);
    if (websiteError) errors.website = websiteError;

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: currentUser.email,
      fullName: currentUser.fullName,
      username: currentUser.username,
      bio: currentUser.rawBio || '',
      website: currentUser.website || '',
    },
    validate,
    onSubmit: async (values) => {
      await updateProfileStart(token, values);
      showAlert('Profile saved.');
    },
  });

  useEffect(() => {
    document.title = 'Auth Settings • Dogegram';
  }, []);

  return (
    <SettingsForm onSubmit={formik.handleSubmit}>
      <SettingsFormGroup>
          <Avatar
            className="avatar--medium"
            imageSrc={currentUser.avatar}
            style={{ alignSelf: 'start' }}
          />
        <div style={{ lineHeight: '2.2rem' }}>
          <h3 className="heading-2 font-medium">{currentUser.username}</h3>
        </div>
      </SettingsFormGroup>
      <SettingsFormGroup>
        <label></label>
        <div>
          <h3 className="heading-3 color-grey font-bold">
            Login on other apps with Dogegram Account
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem' }}
            className="color-grey"
          >
            Provide your information to another app easily by sharing the token below, only share your token with apps you trust. This token gives access to your account and can be used to get your personal information.
          </p>
        </div>
      </SettingsFormGroup>
      <div style={{display: 'flex', wordBreak: 'break-all'}}>
        <label className="heading-2 font-bold">Token:</label>
        <h2 className="heading-2 font-bold" style={{marginleft: 10}}> Work In Progress{currentUser.ssotoken}</h2>
        </div>
      <SettingsFormGroup>
        <label></label>
        <div>
          <h3 className="heading-3 color-red font-bold">
            Revoke token
          </h3>
          <p
            style={{ fontSize: '1.3rem', lineHeight: '1.6rem', marginBottom: '10px'}}
            className="color-red"
          >
            If your account has been hacked, this token has been leaked, or you see many apps not added by you. You should revoke this token now, and reload this page. Note: This will revoke all the current app sessions.
          </p>
          <label></label>
        </div>
      </SettingsFormGroup>
    </SettingsForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAuthForm);
