import React, { PropTypes } from 'react';
import TermThumbnail from './TermThumbnail';

const propTypes = {
  dictentries: PropTypes.arrayOf(
    PropTypes.shape({
      de: PropTypes.string.isRequired,
      nl: PropTypes.array,
      subjectFields: PropTypes.array,
    })),
  siteUrl: PropTypes.string,
  queryTime: PropTypes.number,
  count: PropTypes.number,
};

const defaultProps = {
  dictentries: [],
};

// Query but no results
const noResultsInfo = () => (
    <div className='results-info'>
      <h5>Geen zoekresultaten</h5>
      <h6>Uw zoekopdracht heeft geen resultaten opgeleverd.</h6>
    </div>
)

// Query with results
const resultsInfo = (queryTime, numberOfResults) => (
  <div className='results-info'>
    <p>{numberOfResults} resultaten in {queryTime/1000} seconden.</p>
  </div>
);

function DictentryList({ dictentries, siteUrl, queryTime, count }) {
  return (
    <div>
      { (count === 0 && queryTime != 0) ? noResultsInfo() : '' }
      { (count != 0 && queryTime != 0) ? resultsInfo(queryTime, count) : '' }

      <ul className="term-list">
        {dictentries.map(dictentry => (
          <li key={dictentry.id}>
            <TermThumbnail
              term={dictentry.de}
              termUrl={dictentry.deUrl}
              translations={dictentry.nl}
              subjectFields={dictentry.subjectFields}
              siteUrl={siteUrl}
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
