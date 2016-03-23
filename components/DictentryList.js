import React, { PropTypes } from 'react';
import TermThumbnail from './TermThumbnail';

const propTypes = {
  dictentries: PropTypes.arrayOf(PropTypes.shape({
    de: PropTypes.string.isRequired,
    nl: PropTypes.array,
  })),
};

const defaultProps = {
  dictentries: [],
};

function DictentryList({ dictentries }) {
  return (
    <ul className="term-list">
      {dictentries.map(dictentry => (
        <li key={dictentry.id}>
          <TermThumbnail term={dictentry.de} translation={dictentry.nl.join(', ')} />
        </li>
      ))}
    </ul>
  );
}

DictentryList.propTypes = propTypes;
DictentryList.defaultProps = defaultProps;

export default DictentryList;
