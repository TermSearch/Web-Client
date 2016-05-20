import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import LiveSearch from '../components/LiveSearch';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import config from '../config/config';

import {
  toggleSubjectField,
  setTerm,
  fetchDictentries,
  setSelectedSubjectFields,
  queryTime,
  count,
} from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  selectedSubjectFields: PropTypes.array,
  term: PropTypes.string,
  dictentries: PropTypes.array,
  queryTime: PropTypes.number,
  count: PropTypes.number,
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
    const { term, selectedSubjectFields, dictentries, queryTime, count } = this.props;
    return (
      <div className="container app">
        <div className="row search-row">
          <div className="col-sm-8 search-bar">
            <LiveSearch
              handleSearch={this.handleSearch}
              selectedSubjectFields={selectedSubjectFields}
              term={term}
            />
          </div>
        </div>
        <div className="row results">
          <div className="col-sm-8 terms">
            <DictentryList
              dictentries={dictentries}
              siteUrl={config.siteUrl}
              queryTime={queryTime}
              count={count}
            />
          </div>
          <div className="col-sm-4 subject-fields">
            <SubjectFieldList
              selectedSubjectFields={selectedSubjectFields}
              dictentries={dictentries}
              handleSubjectFieldToggle={this.handleSubjectFieldToggle}
            />
          </div>
        </div>
        <Footer siteUrl={config.siteUrl}/>
      </div>
    );
  }
}

TermSearchView.propTypes = propTypes;
TermSearchView.defaultProps = defaultProps;

export default connect(({ selectedSubjectFields, dictentries, term, queryTime, count, }) => ({
  selectedSubjectFields,
  dictentries,
  term,
  queryTime,
  count,
}))(TermSearchView);
