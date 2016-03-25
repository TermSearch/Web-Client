import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { setSubjectFields, setTerm, fetchDictentries } from '../actions';

import SearchInput from '../components/SearchInput';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  subjectFields: PropTypes.array,
  term: PropTypes.string,
  dictentries: PropTypes.array,
};

const defaultProps = {
  term: '',
  subjectFields: [],
  dictentries: [],
};

class TermSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubjectFieldsChange = this.handleSubjectFieldsChange.bind(this);
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

  handleSubjectFieldsChange(subjectFields) {
    const { dispatch } = this.props;
    dispatch(setSubjectFields(subjectFields));
    dispatch(fetchDictentries());
  }

  render() {
    const { term, subjectFields, dictentries } = this.props;
    // console.log(`In TermSearchView: ${subjectFields}`);
    return (
      <div className="app">
        <SearchInput
          value={term}
          placeholder="Vul hier een Duitse term in..."
          handleSearch={this.handleSearch}
        />
        <SubjectFieldList
          subjectFields={subjectFields}
          dictentries={dictentries}
          handleSubjectFieldsChange={this.handleSubjectFieldsChange}
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

export default connect(({ term, subjectFields, dictentries }) => ({
  term,
  subjectFields,
  dictentries,
}))(TermSearchView);
