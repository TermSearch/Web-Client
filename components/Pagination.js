import React, {PropTypes} from 'react';

const propTypes = {};

function Pagination({page, count, handleSetPage}) {

  const numberOfPages = Math.round(count / 10);

  function handlePreviousClick(e) {
    e.preventDefault();
    if (page > 1)
      handleSetPage(page - 1);
    }

  function handleNextClick(e) {
    e.preventDefault();
    if (page < numberOfPages)
      handleSetPage(page + 1);
    }

  return (
    <nav>
      <ul className="pager">
        <li className={ (page <= 1) ? 'previous disabled' : 'previous' }>
          <a href="#" onClick={handlePreviousClick}>Vorige</a>
        </li>
        <li className={ (page >= numberOfPages) ? 'next disabled' : 'next' }>
          <a href="#" onClick={handleNextClick}>Volgende</a>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
