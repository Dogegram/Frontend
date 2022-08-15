import React from 'react';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';


import Icon from '../../Icon/Icon';


const SmallFooter = () => {
  let token = localStorage.getItem('token')
  const links = [
    {url:`https://docs.google.com/forms/d/e/1FAIpQLSefOI8JLmnBiZZZap4Ex_gmJxXDAZTtfOKbm8MjvWLbcC_DWg/viewform?usp=pp_url&entry.1285915497=${token}`, name:"Verification Request"},
    {url:"mailto:ad.partner@dogegram.xyz", name:"Advertise on Dogegram"},
    {url:"mailto:support@dogegram.xyz", name:"Support"},
    {url:`https://docs.google.com/forms/d/e/1FAIpQLSeJMJ_QShaKHy1egP_eGEvvp5M0kbW_WLeMRE347eyan3pzXw/viewform?usp=pp_url&entry.2107609917=${token}`, name:"Abuse Report"}
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
      <h5
        className="heading-5 color-grey-2 footer--small__copyright mt-lg font-bold"
        style={{ textTransform: 'uppercase ' }}
      >
        Version Sierra Juliet 6-1-2
        </h5>
    </footer>
  );
};



export default SmallFooter;
