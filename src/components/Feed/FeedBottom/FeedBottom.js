import React from 'react';

import Divider from '../../Divider/Divider';
import Icon from '../../Icon/Icon';

const FeedBottom = () => (
  <div className="feed__bottom">
    <Divider>
      <Icon
        icon="checkmark-circle-outline"
        className="feed__bottom-icon icon--larger"
      />
    </Divider>
    <h2 className="heading-2">THE END!</h2>
    <h3 className="heading-3 color-grey">
      {`thanks for wandering here, you have seen every post up your feed, follow and discover more people on the search/explore tab!`}
    </h3>
  </div>
);

export default FeedBottom;
