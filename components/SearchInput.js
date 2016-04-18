import React, { PropTypes } from 'react';

const ENTER_KEYCODE = 13;

const propTypes = {
  value: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};

const defaultProps = {
  value: '',
};

function SearchInput(props) {
  const { value, handleSearch } = props;
  const onChange = (e) => handleSearch(e.target.value);
  const onKeyDown = (e) => {
    if (e.keyCode === ENTER_KEYCODE) {
      handleSearch(e.target.value);
    }
  };

  return (
    <div className="inputLP">
      <form>
        <div className="input-group">
          <input
            {...props}
            className="form-control"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            id="search-input"
            type="search"
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">
              <span aria-hidden="true" className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;

export default SearchInput;
