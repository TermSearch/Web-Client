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

function TermThumbnail({ term, termUrl, translations, subjectFields }) {
  return (
    /*
      TODO: Update base url term-search.nl/duits-nederlands/....
    */
    <div className="term-thumbnail">
      <a className="term-link" href={'https://term-search.nl/duits-nederlands/' + termUrl}>
        <h6>
          {term}
          {translations.map(renderTranslation)}
          <span className="subjectfield"> {getSubjectFields(subjectFields).join(', ')}</span>
        </h6>
      </a>
    </div>
  );
}

TermThumbnail.propTypes = propTypes;

export default TermThumbnail;
