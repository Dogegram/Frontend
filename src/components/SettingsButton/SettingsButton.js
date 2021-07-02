import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { showModal } from '../../redux/modal/modalActions';
import { signOut } from '../../redux/user/userActions';

import { SettingsIcon } from '../../components/Icons/Icons';

const SettingsButton = ({ showModal, signOut }) => {
  const history = useHistory();
  return (
    <SettingsIcon
      style={{ cursor: 'pointer' }}
      onClick={() => {
        showModal(
          {
            options: [
              {
                text: 'Change Password',
                onClick: () => history.push('/settings/password'),
              },
              {
                text: 'Yeet me out!',
                onClick: () => alert("Just joking nothing happens lol, it DOES, sent alert to team to yeet you :) as you wished"),
              },
              {
                text: 'Request verification!',
                onClick: () => alert("currently no, such system, we will verify the people with more than 100k followers or much importance, i.e Hrichik as he made this (I am also writing this now)"),
              },
              {
                text: 'Log Out',
                onClick: () => {
                  signOut();
                  history.push('/');
                },
              },
            ],
          },
          'OptionsDialog/OptionsDialog'
        );
      }}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (props, component) => dispatch(showModal(props, component)),
  signOut: () => dispatch(signOut()),
});

export default connect(null, mapDispatchToProps)(SettingsButton);
