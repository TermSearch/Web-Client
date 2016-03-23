import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setQuery, fetchDictentries } from '../actions';

import SearchInput from '../components/SearchInput';
import DictentryList from '../components/DictentryList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.string,
  dictentries: PropTypes.array,
};

const defaultProps = {
  query: '',
  dictentries: [],
};

class TermSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
  }

  // fetch on page load
  componentDidMount() {
    this.fetchFromLocation(this.props.location);
  }

  // needed to fetch on back/forward,
  componentWillReceiveProps({ location }) {
    if (location.action === 'POP') {
      this.fetchFromLocation(location);
    }
  }

  fetchFromLocation({ query: { term } }) {
    this.handleSearch(term);
  }

  handleSearch(value) {
    const { dispatch } = this.props;
    dispatch(setQuery(value));
    dispatch(fetchDictentries());
  }

  render() {
    const { query, dictentries } = this.props;

    return (
      <div className="app">
        <SearchInput
          value={query}
          placeholder="Vul hier een Duitse term in..."
          handleSearch={this.handleSearch}
        />
      <DictentryList dictentries={dictentries} />
      </div>
    );
  }
}

TermSearchView.propTypes = propTypes;
TermSearchView.defaultProps = defaultProps;

export default connect(({ query, dictentries }) => ({
  query,
  dictentries,
}))(TermSearchView);
