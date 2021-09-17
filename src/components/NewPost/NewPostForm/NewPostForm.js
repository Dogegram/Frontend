import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';

import {
  selectToken,
  selectCurrentUser,
} from '../../../redux/user/userSelectors';
import { showAlert } from '../../../redux/alert/alertActions';
import { addPost } from '../../../redux/feed/feedActions';

import { createPost } from '../../../services/postService';
import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";

import Avatar from '../../Avatar/Avatar';
import MobileHeader from '../../Header/MobileHeader/MobileHeader';
import Icon from '../../Icon/Icon';
import TextButton from '../../Button/TextButton/TextButton';
import Loader from '../../Loader/Loader';

const NewPostForm = ({
  token,
  file,
  previewImage,
  currentUser,
  hide,
  back,
  showAlert,
  addPost,
}) => {
  const [caption, setCaption] = useState('');
  const [postText, setpostText] = useState('');
  const [loading, setLoading] = useState(false);
  const [willshowEmojis, setShowEmojis] = useState(false);

  const history = useHistory();

  const handleClick = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.set('caption', caption);
    formData.set('postText', postText);
    formData.set('crop', JSON.stringify(previewImage.crop));
    previewImage.filterName && formData.set('filter', previewImage.filterName);
    try {
      setLoading(true);
      const post = await createPost(formData, token);
      setLoading(false);
      hide();
      if (history.location.pathname === '/') {
        addPost(post);
      } else {
        history.push('/');
      }
    } catch (err) {
      setLoading(false);
      console.log(err)
      showAlert(err.message || err.error ||'Could not share post.', () =>
        handleClick(event)
      );
    }
  };

  const handleSelectEmoji = (e) => {
    setCaption(caption + e.native)    
  };

  const showEmojis = ()=>{
    setShowEmojis(willshowEmojis ? false : true) 
  }


  return (
    <Fragment>
      {loading && <Loader />}
      <MobileHeader show>
        <Icon
          icon="chevron-back"
          onClick={() => back()}
          style={{ cursor: 'pointer' }}
        />
        <h3 className="heading-3">New Post</h3>
        <TextButton
          bold
          blue
          style={{ fontSize: '1.5rem' }}
          onClick={(event) => handleClick(event)}
        >
          Share
        </TextButton>
      </MobileHeader>
      <form
        style={file && { display: 'block' }}
        className="new-post__form post-form"
      >
        <Fragment>
          <div className="post-form__input">
            <div className="post-form__avatar">
              <Avatar
                size="3rem"
                className="avatar--small"
                imageSrc={
                  currentUser.avatar
                    ? currentUser.avatar
                    : require('../../../assets/img/default-avatar.png').default
                }
              />
            </div>
            <textarea
              className="post-form__textarea"
              placeholder="Write a caption..."
              onChange={(event) => setCaption(event.target.value)}
              value={caption}
            />
          <p style={{
            display:'flex',
            background:'#fff',
            cssFloat: "bottom-right",
            border: "none",
            margin: 0,
            cursor: "pointer",   
            alignItems: 'flex-end',
            paddingBottom: '10px',
          }} onClick={showEmojis}>
            <Emoji emoji='wink' set='twitter' size={20} />
          </p>
          {willshowEmojis ? (
          <span 
          style={{
            position: "absolute",
            bottom: 50,
            right: 0,
            cssFloat: "right",
          }}>
            <Picker
              onSelect={handleSelectEmoji}
              set='twitter'
              emojiTooltip={true}
              title="The Dogemoji store"
            />
          </span>
        ) : (
          null
        )}
            <div className="post-form__preview">
              <img
                src={previewImage.src}
                alt="Preview"
                style={{ filter: previewImage.filter }}
              />
            </div>
          </div>
        </Fragment>
        <Fragment>
        <textarea
              className="post-form__subtextarea post-form__textarea"
              placeholder="Write a post header text..."
              onChange={(event) => setpostText(event.target.value)}
        />
        </Fragment>
        <div className="post-form__legalnotice">
        <h5 style={{ fontSize: '1rem' }}>By Posting content to our platform, you agree to abide by our community rules, terms of service and privacy policy.</h5>
        </div>
      </form>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
  addPost: (post) => dispatch(addPost(post)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPostForm);
