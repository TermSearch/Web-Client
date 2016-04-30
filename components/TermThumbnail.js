import React, { PropTypes } from 'react';

const propTypes = {
  term: PropTypes.string,
  translations: PropTypes.array,
  subjectFields: PropTypes.array,
};

const renderTranslation = (translation, i) => (
  <span className="translation" key={i}>
    <b> {i+1}</b> {translation}
  </span>
)

// Returns an array of subjectfield strings
const getSubjectFields = (subjectFields) => subjectFields.map(sf => sf.termStr);

function TermThumbnail({ term, translations, subjectFields }) {
  return (
    /*
      TODO: Add links to static pages
      TODO: Appearance static search results term-search.nl
    */
    <div className="term-thumbnail">
      <h6>
        {term}
        {translations.map(renderTranslation)}
        <span className="subjectfield"> {getSubjectFields(subjectFields).join(', ')}</span>
      </h6>
    </div>
  );
}

TermThumbnail.propTypes = propTypes;

export default TermThumbnail;
