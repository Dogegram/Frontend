import React from 'react';

const InfoPrompt = ({ component, text }) => (
  <div className="unfollow-prompt">
    {component}
    <p
      style={{ marginTop: '3rem' }}
      className="heading-4"
    >{text}</p>
  </div> 
);

export default InfoPrompt;
