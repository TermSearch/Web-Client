import React, { PropTypes } from 'react';
import FriendThumbnail from './FriendThumbnail';

const propTypes = {
  dictentries: PropTypes.arrayOf(PropTypes.shape({
    de: PropTypes.string.isRequired,
  })),
};

const defaultProps = {
  dictentries: [],
};

function DictentryList({ dictentries }) {
  return (
    <ul className="friend-list">
      {dictentries.map(dictentry => (
        <li key={dictentry.id}>
          <FriendThumbnail name={dictentry.de} username={dictentry.nl.join(', ')} />
        </li>
      ))}
    </ul>
  );
}

DictentryList.propTypes = propTypes;
DictentryList.defaultProps = defaultProps;

export default DictentryList;
