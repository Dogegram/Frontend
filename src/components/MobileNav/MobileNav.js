import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Icon from '../Icon/Icon';
import NotificationButton from '../Notification/NotificationButton/NotificationButton';
import NewPostButton from '../NewPost/NewPostButton/NewPostButton';
import Avatar from '../Avatar/Avatar';
import {ExploreIcon, HomeIcon} from '../Icons/Icons';


const MobileNav = ({ currentUser }) => {
  const {
    location: { pathname },
  } = useHistory();

  return (
    <nav className="mobile-nav">
      <ul className="mobile-nav__list">
        <li>
          <Link to="/">
            <HomeIcon/>
          </Link>
        </li>
        <li>
          <Link to="/explore">
          <ExploreIcon width="30px"/>
          </Link>
        </li>
        <li>
          <NewPostButton plusIcon={true} />
        </li>
        <li>
          <Link to="/activity">
          <NotificationButton />
          </Link>
        </li>
        <li>
          <Link to={`/${currentUser.username}`}>
            <Avatar
              imageSrc={currentUser.avatar}
              style={{width:'30px', height:'30px'}}

            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
