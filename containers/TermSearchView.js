import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LiveSearch from '../components/LiveSearch';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';
import Logo from '../components/Logo.js';

import {
  toggleSubjectField,
  setTerm,
  fetchDictentries,
  setSelectedSubjectFields,
} from '../actions';

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

  fetchFromLocation({ query: { term, selectedSubjectFields } }) {
    const { dispatch } = this.props;
    // Convert selectedSubjectFields to array if string
    if (selectedSubjectFields && selectedSubjectFields.constructor === String) selectedSubjectFields = [selectedSubjectFields];
    dispatch(setSelectedSubjectFields(selectedSubjectFields));
    dispatch(setTerm(term));
    this.handleSearch();
  }

  handleSearch() {
    const { dispatch, term } = this.props;
    dispatch(fetchDictentries())
  }

  handleSubjectFieldToggle(subjectField) {
    const { dispatch } = this.props;
    dispatch(toggleSubjectField(subjectField));
    this.handleSearch();
  }

  render() {
    const { term, selectedSubjectFields, dictentries } = this.props;
    return (
      <div className="app container">
        <div className="row input-row">
          {
            // TODO: Move logo into same column as LiveSearch
            // TODO: LiveSearch 8 columns?
          }
          <div className="col-sm-4 col-xs-2">
            <Logo />
          </div>
          <div className="col-sm-8 col-xs-10">
            <LiveSearch
              handleSearch={this.handleSearch}
              selectedSubjectFields={selectedSubjectFields}
              term={term}
            />
          </div>
        </div>
        <div className="row results-row">
          {
            // TODO: Move SubjectFieldList to right side
          }
          <div className="col-sm-4">
            <SubjectFieldList
              selectedSubjectFields={selectedSubjectFields}
              dictentries={dictentries}
              handleSubjectFieldToggle={this.handleSubjectFieldToggle}
            />
          </div>
          <div className="col-sm-8">
            <DictentryList
              dictentries={dictentries}
            />
          </div>
        </div>
      </div>
    );
  }
}

TermSearchView.propTypes = propTypes;
TermSearchView.defaultProps = defaultProps;

export default connect(({ selectedSubjectFields, dictentries, term }) => ({
  selectedSubjectFields,
  dictentries,
  term
}))(TermSearchView);
