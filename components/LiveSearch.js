import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest'; // see async example: http://codepen.io/moroshko/pen/EPZpev
import Logo from './Logo.js';
import liveSearch from '../api/liveSearch';
import debounce from '../util/debounce';
import { connect } from 'react-redux';
import {
  setTerm,
  liveSearchLoading,
  setSuggestions,
  clearAll
} from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  selectedSubjectFields: PropTypes.array,
  liveSearchIsLoading: PropTypes.bool,
  suggestions: PropTypes.array,
};

const defaultProps = {
  selectedSubjectFields: [],
  liveSearchIsLoading: false,
  suggestions: [],
};

// For Autosuggest component
const getSuggestionValue = suggestion => suggestion.de;

// For Autosuggest component
/*
  TODO: Update how suggestions look, see Google for inspiration?
*/
const renderSuggestion = suggestion => (
    <span>{suggestion.de}</span>
);

class LiveSearch extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  loadSuggestions(value) {
    const { dispatch, selectedSubjectFields, liveSearchIsLoading, suggestions } = this.props;

    /*
      TODO: If form submitted, then live search dispatch for setSuggestions should be cancelled or suggestions should be hidden.
            Maybe use isCollapsed={true} with a Redux value?
    */

    // Is liveSearchIsLoading then filter current sugggestions
    if (liveSearchIsLoading) {
      const regex = new RegExp('^' + value, 'i');
      const filteredSuggestions = suggestions.filter(suggestion => regex.test(suggestion.de));
      dispatch(setSuggestions(filteredSuggestions));
    }

    // Start loading
    dispatch(liveSearchLoading(true));

    // Start API call
    liveSearch({ term: value, selectedSubjectFields })
      .then(dictentries => {
        // Ignore suggestions if input value has changed
        if (value === this.props.term) dispatch(setSuggestions(dictentries));
        dispatch(liveSearchLoading(false));
    });
  }

  onSuggestionSelected(event, { suggestionValue }) {
    const { handleSearch, dispatch } = this.props;
    this.loadSuggestions(suggestionValue);
  }

  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value);
  }

  onChange(event, { newValue, method }) {
    const { dispatch, handleSearch } = this.props;
    dispatch(setTerm(newValue));
    if (method === 'click') handleSearch();
  }

  handleReset(event) {
    const { dispatch } = this.props;
    dispatch(clearAll());
  }

  onSubmit(event) {
    event.preventDefault();
    const { handleSearch, dispatch } = this.props;
    /*
      HACK: empty suggestions to hide them
    */
    dispatch(setSuggestions([]));
    handleSearch();
  }

  render() {
    const {
      term,
      selectedSubjectFields,
      liveSearchIsLoading,
      suggestions
    } = this.props;

    const inputProps = {
      placeholder: "Begin met typen",
      value: term,
      onChange: this.onChange
    };

    // const status = (liveSearchIsLoading ? 'bezig...' : 'vul iets in voor suggesties');

    return (
      <form onSubmit={this.onSubmit}>
        {/*
          TODO: Create a spinner instead of this
          <div className="status">
          <strong>Status:</strong> {status}
        </div>
        */}
        <div className="input-group">
          <Logo />
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
          <span
            id="searchclear"
            className="glyphicon glyphicon-remove-circle"
            onClick={this.handleReset}
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
  liveSearchIsLoading,
  suggestions,
}) => ({
  liveSearchIsLoading,
  suggestions,
}))(LiveSearch);
