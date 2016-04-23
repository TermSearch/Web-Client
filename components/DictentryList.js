import React, { PropTypes } from 'react';
import TermThumbnail from './TermThumbnail';

const propTypes = {
  dictentries: PropTypes.arrayOf(PropTypes.shape({
    de: PropTypes.string.isRequired,
    nl: PropTypes.array,
    subjectFields: PropTypes.array,
  })),
};

const defaultProps = {
  dictentries: [],
};

// Returns an array of subjectfield strings
const getSubjectFields = (subjectFields) => subjectFields.map(sf => sf.termStr);

function DictentryList({ dictentries }) {
  /*
    TODO: Search results for same dictentry.de should be merged, see static implementation
  */
  return (
    <ul className="term-list">
      {dictentries.map(dictentry => (
        <li key={dictentry.id}>
          <TermThumbnail
            term={dictentry.de}
            translation={dictentry.nl.join(', ')}
            subjectFields={getSubjectFields(dictentry.subjectFields).join(', ')}
          />
        </li>
      ))}
    </ul>
  );
}

DictentryList.propTypes = propTypes;
DictentryList.defaultProps = defaultProps;

export default DictentryList;
