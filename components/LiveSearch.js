import React from 'react';
import Autosuggest from 'react-autosuggest'; // see example: http://codepen.io/moroshko/pen/LGNJMy
import liveSearch from '../api/liveSearch';
import debounce from '../util/debounce';

const debouncedSearch = debounce(liveSearch, 500);

/* ----------- */
/*    Utils    */
/* ----------- */

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
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSuggestionsUpdateRequested = this.onSuggestionsUpdateRequested.bind(this);
  }

  loadSuggestions(value, selectedSubjectFields) {
    this.setState({
      isLoading: true
    });
    const escapedValue = escapeRegexCharacters(value.trim());
    // API call
    debouncedSearch({ term: escapedValue, selectedSubjectFields }).then(dictentries => {
      const suggestions = dictentries;
      if (value === this.state.value) {
        this.setState({
          isLoading: false,
          suggestions
        });
      } else { // Ignore suggestions if input value changed
        this.setState({
          isLoading: false
        });
      }
    });
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionSelected(event, { suggestionValue }) {
    this.loadSuggestions(suggestionValue, this.props.selectedSubjectFields);
  }

  onSuggestionsUpdateRequested({ value }) {
    this.loadSuggestions(value, this.props.selectedSubjectFields);
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleSearch(this.state.value);
  }

  render() {
    const { value, suggestions, isLoading } = this.state;

    const inputProps = {
      placeholder: "Vul hier een Duitse term in...",
      value,
      onChange: this.onChange
    };

    const status = (isLoading ? 'bezig...' : 'vul iets in voor suggesties');

    return (
      <form onSubmit={this.onSubmit} onBlur={this.onSubmit}>
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
        <div className="status">
          <strong>Status:</strong> {status}
        </div>
      </form>
    );
  }
}

export default LiveSearch;
