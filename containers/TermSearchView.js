import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setSubjectField, setQuery, fetchDictentries } from '../actions';

import SearchInput from '../components/SearchInput';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  query: PropTypes.string,
  dictentries: PropTypes.array,
};

const defaultProps = {
  query: '',
  subjectField: [],
  dictentries: [],
};

class TermSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubjectFieldChange = this.handleSubjectFieldChange.bind(this);
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

  fetchFromLocation({ query: { term, subjectField } }) {
    const { dispatch } = this.props;
    dispatch(setSubjectField(subjectField));
    this.handleSearch(term);
  }

  handleSearch(term) {
    const { dispatch } = this.props;
    dispatch(setQuery(term));
    dispatch(fetchDictentries());
  }

  handleSubjectFieldChange(subjectField) {
    const { dispatch } = this.props;
    dispatch(setSubjectField(subjectField));
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
        <SubjectFieldList
          dictentries={dictentries}
          handleSubjectFieldChange={this.handleSubjectFieldChange}
        />
        <DictentryList
          dictentries={dictentries}
        />
      </div>
    );
  }
}

TermSearchView.propTypes = propTypes;
TermSearchView.defaultProps = defaultProps;

export default connect(({ query, subjectField, dictentries }) => ({
  query,
  subjectField,
  dictentries,
}))(TermSearchView);
