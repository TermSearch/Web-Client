import React, {PropTypes} from 'react';

const propTypes = {};

const pageLinks = (page, numberOfPages, handlePageClick) => {

  const maxPages = 10;

  let firstPage = (numberOfPages > maxPages && page > maxPages)
    ? page - Math.round(maxPages / 2)
    : 1;
  let lastPage = (numberOfPages > maxPages)
    ? page + Math.round(maxPages / 2)
    : numberOfPages;

  if (numberOfPages >= maxPages && page <= maxPages) {
    firstPage = 1;
    lastPage = maxPages;
  }

  const pageLinks = [];

  for (let i = firstPage; i <= lastPage; i++) {
    pageLinks.push(
      <li key={i} className={(i === page)
        ? 'active'
        : ''}>
        <a value={i} onClick={handlePageClick}>
          {i}
        </a>
      </li>
    )
  }

  return pageLinks;
}

function Pagination({page, count, handleSetPage}) {

  const numberOfPages = Math.round(count / 20);

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

  function handlePageClick(e) {
    e.preventDefault();
    handleSetPage(e.target.value);
  }

  // Render empty nav if only one page
  if (numberOfPages <= 1)
    return (
      <nav></nav>
    );

  return (
    <nav id="pager">
      <ul className="pagination pagination-sm">

        <li className={(page <= 1)
          ? 'disabled'
          : ''}>
          <a aria-label="Vorige" id='prev' onClick={handlePreviousClick}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {pageLinks(page, numberOfPages, handlePageClick)}

        <li className={(page >= numberOfPages)
          ? 'disabled'
          : ''}>
          <a aria-label="Volgende" id='next' onClick={handleNextClick}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

      </ul>
    </nav>
  );
}

Pagination.propTypes = propTypes;

export default Pagination;
