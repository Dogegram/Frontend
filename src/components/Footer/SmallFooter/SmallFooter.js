import React from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../Icon/Icon';

const SmallFooter = () => {
  const links = [
    {url:"https://verify.dogegram.xyz", name:"Verification Request"},
    {url:"https://about.dogegram.xyz", name:"About"},
    {url:"https://support.dogegram.xyz", name:"Support"},
    {url:"https://abuse.dogegram.xyz", name:"Abuse Report"}
  ];
  return (
    <footer className="footer--small color-grey-2 font-bold">
      <div className="footer--small__links">
        {links.map((link, idx) => (
          <a key={idx} href={(link.url)}>
            {link.name}
          </a>
        ))}
      </div>
      <h5
        className="heading-5 color-grey-2 footer--small__copyright mt-lg font-bold"
        style={{ textTransform: 'uppercase ' }}
      >
        Made with{' '}
        <Icon
          icon="heart"
          className="color-grey-2 icon--small"
          style={{ margin: '0 5px' }}
        />{' '}
        In India
      </h5>
    </footer>
  );
};

export default SmallFooter;
