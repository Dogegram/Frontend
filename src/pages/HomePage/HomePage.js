import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import sendTokenToServer from '../../components/Firebase/Firebase'

import { selectCurrentUser, selectToken } from '../../redux/user/userSelectors';
import {
  selectFeedPosts,
  selectHasMore,
  selectFeedFetching,
} from '../../redux/feed/feedSelectors';
import { fetchFeedPostsStart, clearPosts } from '../../redux/feed/feedActions';

import useScrollPositionThrottled from '../../hooks/useScrollPositionThrottled';

import Feed from '../../components/Feed/Feed';
import UserCard from '../../components/UserCard/UserCard';
import SmallFooter from '../../components/Footer/SmallFooter/SmallFooter';
import MobileHeader from '../../components/Header/MobileHeader/MobileHeader';
import Icon from '../../components/Icon/Icon';
import NewPostButton from '../../components/NewPost/NewPostButton/NewPostButton';
import SuggestedUsers from '../../components/Suggestion/SuggestedUsers/SuggestedUsers';

// initialize FCM
sendTokenToServer()

const HomePage = ({
  currentUser,
  fetchFeedPostsStart,
  clearPosts,
  token,
  feedPosts,
  hasMore,
  fetching,
}) => {
  useEffect(() => {
    document.title = `Dogegram`;
    fetchFeedPostsStart(token);
    return () => {
      clearPosts();
    };
  }, [clearPosts, fetchFeedPostsStart, token]);

  useScrollPositionThrottled(
    ({ atBottom }) => {
      if (atBottom && hasMore && !fetching) {
        fetchFeedPostsStart(token, feedPosts.length);
      }
    },
    null,
    [hasMore, fetching]
  );

  return (
    <Fragment>
      <MobileHeader>
        <NewPostButton />
        <h3 style={{ fontSize: '2.5rem' }} className="heading-logo">
          Dogegram
        </h3>
      </MobileHeader>
      <main data-test="page-home" className="home-page grid" style={{gridTemplateColumns: window.innerWidth <= 760 ? null : !fetching && feedPosts.length === 0 ? null : "[full-start] 355px [center-start] repeat(30,[col-start] minmax(min-content,20rem) [col-end]) [center-end] 100px [full-end]"}}>
        {!fetching && feedPosts.length === 0 ? (
          <SuggestedUsers card />
        ) : (
          <Fragment>
          <aside className="sidebar">
              <div className="sidebar__content">
                <UserCard
                  avatar={currentUser.avatar}
                  username={currentUser.username}
                  subText={currentUser.fullName}
                  style={{ padding: '0' }}
                  avatarMedium
                />
                <SuggestedUsers max={5} style={{ width: '100%' }} />
                <SmallFooter />
              </div>
            </aside>
            <Feed />
          </Fragment>
        )}
      </main>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  feedPosts: selectFeedPosts,
  hasMore: selectHasMore,
  fetching: selectFeedFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFeedPostsStart: (authToken, offset) =>
    dispatch(fetchFeedPostsStart(authToken, offset)),
  clearPosts: () => dispatch(clearPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
