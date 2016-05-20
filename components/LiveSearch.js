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
const renderSuggestion = suggestion => (
    <span>{suggestion.de}</span>
);

class LiveSearch extends React.Component {
  constructor() {
    super();
    this.stopLiveSeach = false;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  loadSuggestions(value) {
    const {
        dispatch,
        selectedSubjectFields,
        liveSearchIsLoading,
        suggestions
      } = this.props;

    // Is liveSearchIsLoading then filter current sugggestions
    if (liveSearchIsLoading) {
      const regex = new RegExp('^' + value, 'i');
      const filteredSuggestions = suggestions.filter(suggestion => regex.test(suggestion.de));
      dispatch(setSuggestions(filteredSuggestions));
    }

    // Start loading
    dispatch(liveSearchLoading(true));

    // Start API call
    liveSearch({
        term: value,
        selectedSubjectFields
      })
      .then(dictentries => {

        // Ignore suggestions if input value has changed
        if (value === this.props.term && !this.stopLiveSeach) {
          dispatch(setSuggestions(dictentries));
        }

        this.stopLiveSeach = false;
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
    this.stopLiveSeach = true; // HACK: stops live search update with local variable
    dispatch(setSuggestions([])); // HACK: empty suggestions to hide them
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
      value: term,
      onChange: this.onChange
    };

    return (
      <form onSubmit={this.onSubmit}>
        {/*
          TODO: Create a progress bar instead of this
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
            id="clear-search-button"
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
