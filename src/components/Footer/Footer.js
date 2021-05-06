import React from 'react';

import TextButton from '../Button/TextButton/TextButton';
import Icon from '../Icon/Icon';

const Footer = () => (
  <footer className="footer">
      <h4
        className="heading-4 color-grey font-bold"
        style={{ width:'100%' , display: 'flex', alignItems: 'center', alignText: 'center' }}
      >
        MADE WITH
        <Icon
          className="icon--small color-grey"
          icon="heart"
          style={{ display: 'inline-block', margin: '0 5px' }}
        />{' '}
        IN INDIA
      </h4>
  </footer>
);

export default Footer;
