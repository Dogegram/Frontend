import React, { useState, memo, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

import { selectCurrentUser } from '../../redux/user/userSelectors';

import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';

import { ReactComponent as LogoDoge } from '../../assets/svg/logo-transparent.svg';
import SearchBox from '../SearchBox/SearchBox';
import NewPostButton from '../NewPost/NewPostButton/NewPostButton';
import NotificationButton from '../Notification/NotificationButton/NotificationButton';
import Button from '../Button/Button';
import {ExploreIcon, NotificationIcon, UserIcon, PhotoIcon} from '../Icons/Icons';
import Avatar from '../Avatar/Avatar';

const Header = memo(({ currentUser }) => {
  const [shouldMinimizeHeader, setShouldMinimizeHeader] = useState(false);
  const {
    location: { pathname },
  } = useHistory();

  // Shrink header height and remove logo on scroll
  useScrollPositionThrottled(({ currentScrollPosition }) => {
    if (window.outerWidth > 600) {
      setShouldMinimizeHeader(currentScrollPosition > 100);
    }
  });

  const headerClassNames = classNames({
    header: true,
    'header--small': shouldMinimizeHeader,
  });

  return (
    <header className={headerClassNames}>
      <div className="header__content">
        <Link to="/" className="header__logo">
          <div className="header__logo-image">
            <LogoDoge />
          </div>
          <div className="header__logo-header">
            <h3 className="heading-logo">Dogegram</h3>
          </div>
        </Link>
        <SearchBox />
        <div className="header__icons">
          {currentUser ? (
            <Fragment>
              <Link to="/explore" style={{marginTop:'3px'}}>
                <ExploreIcon/>
              </Link>
              <NotificationButton />
              <NewPostButton />
              <Link to={'/' + currentUser.username}>
                <Avatar imageSrc={currentUser.avatar} style={{width:'27px', height:'27px'}}/>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link style={{ marginRight: '1rem' }} to="/login">
                <Button>Log In</Button>
              </Link>
              <Link to="/signup">
                <h3 className="heading-3 heading--button color-blue">
                  Sign Up
                </h3>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
});

Header.whyDidYouRender = true;

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
