import React, {
  useReducer,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "emoji-mart/css/emoji-mart.css";
import { Picker, Emoji } from "emoji-mart";
import { showAlert } from '../../../redux/alert/alertActions';

import {
  createComment,
  createCommentReply,
} from '../../../services/commentService';

import {
  INITIAL_STATE,
  postDialogCommentFormReducer,
} from './postDialogCommentFormReducer';

import useSearchUsersDebounced from '../../../hooks/useSearchUsersDebounced';

import Loader from '../../Loader/Loader';
import SearchSuggestion from '../../SearchSuggestion/SearchSuggestion';

const PostDialogCommentForm = ({
  token,
  postId,
  commentsRef,
  dialogDispatch,
  profileDispatch,
  replying,
  currentUser,
  showAlert
}) => {
  const [state, dispatch] = useReducer(
    postDialogCommentFormReducer,
    INITIAL_STATE
  );
  const [mention, setMention] = useState(null);
  const [willshowEmojis, setShowEmojis] = useState(false);
  const [commentText, setcommentText] = useState('');



  let {
    handleSearchDebouncedRef,
    result,
    setResult,
    fetching,
    setFetching,
  } = useSearchUsersDebounced();

  const commentInputRef = useRef();

  useEffect(() => {
    if (replying && commentInputRef.current) {
      commentInputRef.current.value = `@${replying.commentUser} `;
      commentInputRef.current.focus();
    }
  }, [replying]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (commentText.length === 0) {
      return dispatch({
        type: 'POST_COMMENT_FAILURE',
        payload: 'You cannot post an empty comment.',
      });
    }

    try {
      setResult(null);
      dispatch({ type: 'POST_COMMENT_START' });
      if (!replying) {
        // The user is not replying to a comment
        const comment = await createComment(commentText, postId, token);
        dispatch({
          type: 'POST_COMMENT_SUCCESS',
          payload: { comment, dispatch: dialogDispatch, postId },
        });
        // Scroll to bottom to see posted comment
        commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
      } else {
        // The user is replying to a comment
        const comment = await createCommentReply(
          commentText,
          replying.commentId,
          token
        );
        dispatch({
          type: 'POST_COMMENT_REPLY_SUCCESS',
          payload: {
            comment,
            dispatch: dialogDispatch,
            parentCommentId: replying.commentId,
          },
        });
        dialogDispatch({ type: 'SET_REPLYING' });
      }
      // Increment the comment count on the overlay of the image on the profile page
      profileDispatch &&
        profileDispatch({
          type: 'INCREMENT_POST_COMMENTS_COUNT',
          payload: postId,
        });
        setcommentText('')
        setShowEmojis(false)
    } catch (err) {
      showAlert(err.message)
      dispatch({ type: 'POST_COMMENT_FAILURE', payload: err });
    }
  };

    const handleSelectEmoji = (e) => {
      console.log(e)
      console.log(commentText)
      setcommentText(commentText + e.native)
      
    };

    const showEmojis = ()=>{
      setShowEmojis(willshowEmojis ? false : true) 
    }

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      className="post-dialog__add-comment"
      data-test="component-post-dialog-add-comment"
    >
      <Fragment>
        {currentUser ? (
          <Fragment>
            {state.posting && <Loader />}
            <input
              className="add-comment__input"
              type="text"
              placeholder="Add a comment..."
              onChange={(event) => {
                setcommentText(event.target.value)
                // Removed the `@username` from the input so the user is no longer looking to reply
                if (replying && !event.target.value) {
                  dialogDispatch({ type: 'SET_REPLYING' });
                }
                dispatch({ type: 'SET_COMMENT', payload: event.target.value });
                // Checking for an @ mention
                let string = event.target.value.match(
                  new RegExp(/@[a-zA-Z0-9]+$/)
                );
                if (string) {
                  setMention(() => {
                    setFetching(true);
                    const mention = string[0].substring(1);
                    // Setting the result to an empty array to show skeleton
                    setResult([]);
                    handleSearchDebouncedRef(mention);
                    return mention;
                  });
                } else {
                  setResult(null);
                }
              }}
              value={commentText}
              ref={commentInputRef}
              data-test="component-add-comment-input"
            />
            {willshowEmojis ? (
          <span style={{
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
        <p style={{
            cssFloat: "right",
            border: "none",
            margin: 0,
            cursor: "pointer",  
            paddingRight: 20
          }} onClick={showEmojis}>
            <Emoji emoji='wink' set='twitter' size={20} />
          </p>
            <button
              type="submit"
              className="heading-3 heading--button font-bold color-blue"
            >
              Post
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <h4 className="heading-4 font-medium color-grey">
              <span>
                <Link to="/login" className="link">
                  Log in
                </Link>{' '}
              </span>
              to like or comment.
            </h4>
          </Fragment>
        )}
      </Fragment>
      {result && (
        <SearchSuggestion
          fetching={fetching}
          result={result}
          username={mention}
          onClick={(user) => {
            let comment = commentInputRef.current.value;
            // Replace the last word with the @mention
            dispatch({
              type: 'SET_COMMENT',
              payload: comment.replace(/@\b(\w+)$/, `@${user.username} `),
            });
            commentInputRef.current.focus();
            setResult(null);
          }}
        />
      )}
    </form>
      );
};

PostDialogCommentForm.propTypes = {
  token: PropTypes.string,
  postId: PropTypes.string.isRequired,
  commentsRef: PropTypes.object.isRequired,
  dialogDispatch: PropTypes.func.isRequired,
  profileDispatch: PropTypes.func,
  replying: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showAlert: (text, onClick) => dispatch(showAlert(text, onClick)),
});

export default connect(null, mapDispatchToProps)(PostDialogCommentForm);
