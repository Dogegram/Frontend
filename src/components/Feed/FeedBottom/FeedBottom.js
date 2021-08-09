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
    <h2 className="heading-2">You made it this way, WoW!</h2>
    <h3 className="heading-3 color-grey">
      {`You are wild man, really, anyway, you can take a screenshot and upload it to Dogegram now!`}
    </h3>
  </div>
);

export default FeedBottom;
