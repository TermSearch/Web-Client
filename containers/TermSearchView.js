import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  toggleSubjectField,
  setTerm,
  fetchDictentries,
} from '../actions';

import SearchInput from '../components/SearchInput';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  selectedSubjectFields: PropTypes.array,
  term: PropTypes.string,
  dictentries: PropTypes.array,
};

const defaultProps = {
  term: '',
  selectedSubjectFields: [],
  dictentries: [],
};

class TermSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubjectFieldToggle = this.handleSubjectFieldToggle.bind(this);
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

  handleSearch(term) {
    const { dispatch } = this.props;
    dispatch(setTerm(term));
    dispatch(fetchDictentries());
  }

  // TODO Move this to children
  handleSubjectFieldToggle(subjectField) {
    const { dispatch } = this.props;
    dispatch(toggleSubjectField(subjectField));
    dispatch(fetchDictentries());
  }

  render() {
    const { term, selectedSubjectFields, dictentries } = this.props;
    // console.log(`In TermSearchView: ${selectedSubjectFields}`);
    return (
      <div className="app">
        <SearchInput
          value={term}
          placeholder="Vul hier een Duitse term in..."
          handleSearch={this.handleSearch}
        />
        <SubjectFieldList
          selectedSubjectFields={selectedSubjectFields}
          dictentries={dictentries}
          handleSubjectFieldToggle={this.handleSubjectFieldToggle}
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

export default connect(({ term, selectedSubjectFields, dictentries }) => ({
  term,
  selectedSubjectFields,
  dictentries,
}))(TermSearchView);
