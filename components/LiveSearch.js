import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest'; // see async example: http://codepen.io/moroshko/pen/EPZpev
import liveSearch from '../api/liveSearch';
import debounce from '../util/debounce';
import { connect } from 'react-redux';
import {
  setTerm,
  liveSearchLoading,
  setSuggestions,
} from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedSubjectFields: PropTypes.array,
  term: PropTypes.string,
  liveSearchIsLoading: PropTypes.bool,
  suggestions: PropTypes.array,
};

const defaultProps = {
  term: '',
  selectedSubjectFields: [],
  liveSearchIsLoading: false,
  suggestions: [],
};

/* ----------- */
/*    Utils    */
/* ----------- */

const debouncedSearch = debounce(liveSearch, 500);

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* --------------- */
/*    Component    */
/* --------------- */

function getSuggestionValue(suggestion) {
  return suggestion.de;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.de}</span>
  );
}

class LiveSearch extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  loadSuggestions(value) {
    const { dispatch, selectedSubjectFields, term } = this.props;
    // Start loading
    dispatch(liveSearchLoading(true));
    // Remove and escape unwanted characters
    const escapedValue = escapeRegexCharacters(value.trim());
    // Start API call
    debouncedSearch({ term: escapedValue, selectedSubjectFields })
      .then(dictentries => {
        // console.log(dictentries);
        // console.log(value);
        // console.log(term);
        dispatch(setSuggestions(dictentries));
        if (value === term) {
          dispatch(liveSearchLoading(false));
          // Set suggestions to API results
          // dispatch(setSuggestions(dictentries));
        } else { // Ignore suggestions if input value changed
          dispatch(liveSearchLoading(false));
        }
    });
  }

  onSuggestionSelected(event, { suggestionValue }) {
    this.loadSuggestions(suggestionValue);
  }

  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value);
  }

  onChange(event, { newValue }) {
    const { dispatch } = this.props;
    dispatch(setTerm(newValue));
  }

  onSubmit(event) {
    const { handleSearch, term } = this.props;
    event.preventDefault();
    handleSearch(term);
  }

  render() {
    const { term, selectedSubjectFields, liveSearchIsLoading, suggestions } = this.props;

    const inputProps = {
      placeholder: "Vul hier een Duitse term in...",
      value: term,
      onChange: this.onChange
    };

    const status = (liveSearchIsLoading ? 'bezig...' : 'vul iets in voor suggesties');

    return (
      <form onSubmit={this.onSubmit}>
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
        <div className="input-group">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">
              <span aria-hidden="true" className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
}

LiveSearch.propTypes = propTypes;
LiveSearch.defaultProps = defaultProps;

export default connect(({
  term,
  liveSearchIsLoading,
  suggestions,
}) => ({
  term,
  liveSearchIsLoading,
  suggestions,
}))(LiveSearch);
