import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Avatar = ({
  imageSrc,
  className,
  onClick,
  style,
  width,
  height,
  props
}) => {
  const avatarClasses = classNames({
    avatar: true,
    [className]: className,
  });

  return (
    <img
        {...props}
      width={width}
      height={height}
      className={avatarClasses}
      onClick={onClick}
      style={style}
      src={imageSrc != undefined ? (imageSrc.includes('dogeis.me') ? imageSrc : `https://bom1-storage.dogegram.xyz/${imageSrc}`) : (require('../../assets/img/default-avatar.png'))}
      alt="Avatar"
    />
  );
};

Avatar.propTypes = {
  imageSrc: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default Avatar;
