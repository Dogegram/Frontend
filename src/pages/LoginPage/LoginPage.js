import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, useLocation } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/userSelectors';

import LoginCard from '../../components/LoginCard/LoginCard';

const LoginPage = ({ currentUser }) => {
  const history = useHistory();
  const { search } = useLocation();
  if (currentUser) history.push('/');
  const params = new URLSearchParams(search);
  const code = params.get('code');
  const authState = params.get('state');

  useEffect(() => {
    if (code) {
      if (!authState === sessionStorage.getItem('authState')) {
        return console.warn('Auth state does not match.');
      }
    }
  }, [authState, code]);

  return (
    <main data-test="page-login" className="login-page">
      <LoginCard />
    </main>
  );
};

LoginPage.propTypes = {
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(LoginPage);
