import React, {PropTypes} from 'react';

const propTypes = {};

const pageLinks = (page, numberOfPages, handlePageClick) => {

  const pageLinks = [];
  for (let i = 1; i <= numberOfPages; i++) {
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
      <ul className="pagination">

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
