import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/userSelectors';

import PasswordResetCard from '../../components/PasswordResetCard/PasswordResetCard';

const PasswordResetPage = ({ currentUser }) => {
  const history = useHistory();
  useEffect(() => {
    if (currentUser) history.push('/settings/changepassword');
  }, [currentUser, history]);
  return (
    <main className="sign-up-page">
      <PasswordResetCard />
    </main> 
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(PasswordResetPage);
