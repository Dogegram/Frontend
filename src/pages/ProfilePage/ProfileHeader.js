import React, { Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';

import ChangeAvatarButton from '../../components/ChangeAvatarButton/ChangeAvatarButton';
import Avatar from '../../components/Avatar/Avatar';
import UsersList from '../../components/UsersList/UsersList';
import UnfollowPrompt from '../../components/UnfollowPrompt/UnfollowPrompt';
import Button from '../../components/Button/Button';
import SettingsButton from '../../components/SettingsButton/SettingsButton';
import { VerifiedIcon, YoutuberIcon, WebIcon, BioIcon, NameIcon, PaymentTipsIcon } from '../../components/Icons/Icons';
import WhisperButton from '../../components/WhisperButton/WhisperButton';
import nFormatter from '../../components/NFormatter/Nformatter'
import InfoPrompt from '../../components/InfoPrompt/InfoPrompt';
const ProfileHeader = ({ 
  currentUser,
  data,
  showModal,
  token,
  follow,
  loading,
}) => {
  const { avatar, username, bio, website, fullName } = data.user;
  const { following, followers, postCount } = data;
  const history = useHistory();


  const showUsersModal = (followers, following) => {
    token &&
      showModal(
        {
          options: [],
          title: followers ? 'Followers' : 'Following',
          cancelButton: false,
          children: (
            <UsersList
              userId={data.user._id}
              token={token}
              followersCount={followers}
              followingCount={following}
              following={following}
            />
          ),
        },
        'OptionsDialog/OptionsDialog'
      );
  };

  const renderButton = () => {
    if (currentUser) {
      if (currentUser.username === username) {
        return (
          <Fragment>
            <Link to="/settings/edit">
              <Button inverted>Edit Profile</Button>
            </Link>
            { window.innerWidth <= 760 ? (null) : (<SettingsButton />) }
          </Fragment>
        );
      } else if (data.isFollowing) {
        return (
          <Button
            loading={loading}
            onClick={() =>
              showModal(
                {
                  options: [
                    {
                      warning: true,
                      text: 'Unfollow',
                      onClick: () => follow(),
                    },
                  ],
                  children: (
                    <UnfollowPrompt
                      avatar={data.user.avatar}
                      username={data.user.username}
                    />
                  ),
                },
                'OptionsDialog/OptionsDialog'
              )
            }
            inverted
          >
            Following
          </Button>
        );
      }
    }
    return (
      <Button loading={loading} onClick={() => follow(data.user._id, token)}>
        Follow
      </Button>
    );
  };

  const tip = () => {
    history.push(`/tips/payment/${username}/${data.user.stripe_account_id}`);
  }

 const showTipModal = () => {
  showModal(
    {
      options: [
        {
          warning: false,
          text: `Let's make a tip!`,
          onClick: () => tip(),
        },
      ],
      children: (
        <InfoPrompt
          component={<h2>Lets tip @{data.user.username} and make their day awesome!</h2>}
          text={`You will be go to secure page for payment :)`}
        />
      ),
    },
    'OptionsDialog/OptionsDialog'
  )
}

  return (
    <header className="profile-header">
      {currentUser && currentUser.username === username ? (
        <ChangeAvatarButton>
          <Avatar
            className="profile-header__avatar"
            imageSrc={currentUser.avatar}
          />
        </ChangeAvatarButton>
      ) : (
        <Avatar className="profile-header__avatar" imageSrc={avatar} />
      )}

      <div className="profile-header__info">
        <div className="profile-buttons">
          <h1 className="heading-1 font-thin" style={{display: 'flex', alignItems: 'center', alignContent:'center', flexWrap: 'nowrap'}}>
            @{username}{data.user.verified ? (<VerifiedIcon/>) : (null)}{data.user.youtuber ? (<a style={{display: 'flex'}} target="_blank" ping="http://localhost:5000/api/user/track" rel="noreferrer" href={data.user.ytlink ? data.user.ytlink : null}><YoutuberIcon style={{marginLeft:"5px"}}/></a>) : (null)}
            </h1>
          {renderButton()}
          { currentUser ? data.isFollowing ? data.user.creator_payout_enabled ? currentUser.payment_enabled ? currentUser.username != data.user.username ? (<Button onClick={()=>{showTipModal()}} style={{display: 'flex', alignItems: 'center'}} inverted><PaymentTipsIcon style={{marginRight: 1}} />Tip this guy</Button>) : (null) : (null) : (null) : (null) : (null)}
          { currentUser ? currentUser.username != data.user.username ? (<WhisperButton username={username} />) : (null) : (null)}
        </div>

        <div className="profile-stats">
          <p className="heading-3">
            <b>{postCount}</b> {postCount === 1 ? 'post' : 'posts'}
          </p>
          <p
            onClick={() => showUsersModal(followers)}
            style={{ cursor: 'pointer' }}
            className="heading-3"
          >
            <b>{nFormatter(followers, 2)}</b>{' '}
            {followers > 1 || followers === 0 ? 'followers' : 'follower'}
          </p>
          <p
            onClick={() => showUsersModal(null, following)}
            style={{ cursor: 'pointer' }}
            className="heading-3"
          >
            <b>{nFormatter(following, 3)}</b> following
          </p>
        </div>

        <div className="profile-header__desktop-info" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'flex-start'}}>
          {fullName && (
            <h3 className="heading-3" style={{ display: 'flex', alignItems: 'center'}}>
              <NameIcon width="18px" height="18px"  style={{fill: '#9e9e9e', margin: '5px'}}/><b>{fullName} {data.user.pronoun ? `or ${data.user.pronoun}` : null}</b>
            </h3>
          )}
          <div className="heading-3" style={{ whiteSpace: 'pre-wrap', display: 'flex', alignItems: 'center'}}>
            { bio ? (<BioIcon className="profile-header__desktop-info__bio-icon" style={{fill: '#9e9e9e', margin: '5px'}}/>) : (null)}
{          <span dangerouslySetInnerHTML={{__html: bio}} />
}          </div>
          <div style={{ display: 'flex', alignItems: 'center'}}>
          {website ? (<WebIcon style={{fill: '#9e9e9e', height: '18px', width: '18px', margin: '5px'}}/>) : (null)}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="heading-3 link font-bold"
            >
              {website}
            </a>
          )}
          </div>
        </div>
      </div>

      <div className="profile-header__mobile-user-details">
        <div>
          {fullName && (
            <p className="heading-3">
              <b>{fullName}</b>
            </p>
          )}
          <h3
            className="heading-3 font-medium"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {<span dangerouslySetInnerHTML={{__html: bio}}/>}
          </h3>
          <h3>
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="heading-3 link font-bold"
            >
              {website}
            </a>
          )}</h3>
        </div>

        <div className="profile-stats">
          <h3 className="heading-3">
            <b>{nFormatter(postCount)}</b>
            <span className="font-medium color-grey">
              {postCount === 1 ? 'post' : 'posts'}
            </span>
          </h3>
          <h3
            onClick={() => showUsersModal(followers)}
            style={{ cursor: 'pointer' }}
            className="heading-3"
          >
            <b>{nFormatter(followers)}</b>{' '}
            <span className="font-medium color-grey">
              {followers > 1 || followers === 0 ? 'followers' : 'follower'}
            </span>
          </h3>
          <h3
            onClick={() => showUsersModal(null, following)}
            style={{ cursor: 'pointer' }}
            className="heading-3"
          >
            <b>{nFormatter(following)}</b>
            <span className="font-medium color-grey">following</span>
          </h3>
        </div>
      </div>
    </header>
  );
};

/*
    <h5 style={{
    display: 'flex',
    marginLeft: '-25px',
    position: 'absolute',
    bottom: 0,
    left: '100%',
    zIndex: 2,
    width: '40px',
    height: '40px',
    borderRadius: '2em',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #dbdbdb',
    }}>😎</h5>

      </div>

*/


export default ProfileHeader;
