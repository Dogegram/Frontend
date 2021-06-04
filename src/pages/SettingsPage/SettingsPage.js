import React, { Fragment } from 'react';
import { NavLink, Switch } from 'react-router-dom';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import Card from '../../components/Card/Card';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import EditAuthForm from '../../components/EditAuthForm/EditAuthForm';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';
import BirthdayUpdateCard from '../../components/BirthdayUpdateCard/BirthdayUpdateCard'

const SettingsPage = () => (
  <Fragment>
    <MobileHeader backArrow>
      <h3 className="heading-3">Edit Profile</h3>
      <div></div>
    </MobileHeader>
    <main className="settings-page grid">
      <Card className="settings-card">
        <ul className="settings-card__sidebar">
          <NavLink
            className="sidebar-link"
            to="/settings/edit"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Edit Profile</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/password"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Change Password</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/birthday"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Update Birthday</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/auth"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Auth (Social Sign In)</li>
          </NavLink>
        </ul>
        <article className="settings-page__content">
          <Switch>
            <ProtectedRoute path="/settings/edit">
              <EditProfileForm />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/password">
              <ChangePasswordForm />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/birthday">
              <BirthdayUpdateCard />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/auth">
              <EditAuthForm />
            </ProtectedRoute>
          </Switch>
        </article>
      </Card>
    </main>
  </Fragment>
);

export default SettingsPage;
