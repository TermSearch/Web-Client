import React, { PropTypes } from 'react';

const propTypes = {
  term: PropTypes.string,
  translation: PropTypes.string,
};

function TermThumbnail({ term, translation }) {
  return (
    <div className="term-thumbnail">
      <h4>{term} <span className="translation">{translation}</span></h4>
    </div>
  );
}

TermThumbnail.propTypes = propTypes;
export default TermThumbnail;
