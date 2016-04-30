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

const noResults = () => (
    <div>
      <h5>Geen zoekresultaten</h5>
      <p>Uw zoekopdracht heeft geen resultaten opgeleverd.</p>
    </div>
)

function DictentryList({ dictentries }) {
  /*
    TODO: Do not show "No results" message when search input is empty
    TODO: Move "No results" message up in component tree to TearmSearchView
  */
  return (
    <div>
      { (dictentries.length === 0) ? noResults() : '' }
      <ul className="term-list">
        {dictentries.map(dictentry => (
          <li key={dictentry.id}>
            <TermThumbnail
              term={dictentry.de}
              translations={dictentry.nl}
              subjectFields={dictentry.subjectFields}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

DictentryList.propTypes = propTypes;
DictentryList.defaultProps = defaultProps;

export default DictentryList;
