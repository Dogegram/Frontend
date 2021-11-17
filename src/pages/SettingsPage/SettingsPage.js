import React, { Fragment } from 'react';
import { NavLink, Switch } from 'react-router-dom';

import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute';
import Card from '../../components/Card/Card';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import Edit2FAAuthForm from '../../components/Edit2FAAuthForm/Edit2FAAuthForm';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';
import BirthdayUpdateCard from '../../components/BirthdayUpdateCard/BirthdayUpdateCard'
import CreatorPayoutsCard from '../../components/CreatorPayoutsCard/CreatorPayoutsCard'
import YoutubeConnectCard from '../../components/YoutubeConnect/YoutubeConnectCard'
import AdWallet from '../../components/Payments/AdWallet'
import { YoutuberIcon } from '../../components/Icons/Icons';

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
            to="/settings/auth-2fa"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">2FA Settings</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/creators"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Creator Connect <YoutuberIcon style={{paddingTop:"5px"}}/></li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/promote"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Ad Wallet</li>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to="/settings/payouts"
            activeClassName="font-bold sidebar-link--active"
          >
            <li className="sidebar-link__text">Creator Payouts</li>
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
            <ProtectedRoute path="/settings/auth-2fa">
              <Edit2FAAuthForm />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/creators">
              <YoutubeConnectCard />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/promote">
              <AdWallet />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/payouts">
              <CreatorPayoutsCard />
            </ProtectedRoute>
            <ProtectedRoute path="/settings/payouts-dash">
              <CreatorPayoutsCard />
            </ProtectedRoute>
          </Switch>
        </article>
      </Card>
    </main>
  </Fragment>
);

export default SettingsPage;
