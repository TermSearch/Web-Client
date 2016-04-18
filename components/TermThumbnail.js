import React, { PropTypes } from 'react';

const propTypes = {
  term: PropTypes.string,
  translation: PropTypes.string,
  subjectFields: PropTypes.string,
};

function TermThumbnail({ term, translation, subjectFields }) {
  return (
    <div className="term-thumbnail">
      <h6>
        {term}
        <span className="translation"> {translation}</span>
        <span className="subjectfield"> {subjectFields}</span>
      </h6>
    </div>
  );
}

TermThumbnail.propTypes = propTypes;

export default TermThumbnail;
