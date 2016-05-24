import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LiveSearch from '../components/LiveSearch';
import Progress from '../components/ProgressBar';
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
  loading
} from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  selectedSubjectFields: PropTypes.array,
  term: PropTypes.string,
  dictentries: PropTypes.array,
  queryTime: PropTypes.number,
  count: PropTypes.number,
  loading: PropTypes.bool
};

const defaultProps = {
  term: '',
  selectedSubjectFields: [],
  dictentries: [],
  loading: false
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
  componentWillReceiveProps({location}) {
    if (location.action === 'POP') {
      this.fetchFromLocation(location);
    }
  }

  fetchFromLocation({
    query: {
      term,
      selectedSubjectFields
    }
  }) {
    const {dispatch} = this.props;
    // Convert selectedSubjectFields to array if string
    if (selectedSubjectFields && selectedSubjectFields.constructor === String)
      selectedSubjectFields = [selectedSubjectFields];
    dispatch(setSelectedSubjectFields(selectedSubjectFields));
    dispatch(setTerm(term));
    this.handleSearch();
  }

  handleSearch() {
    const {dispatch, term} = this.props;
    dispatch(fetchDictentries())
  }

  handleSubjectFieldToggle(subjectField) {
    const {dispatch} = this.props;
    dispatch(toggleSubjectField(subjectField));
    this.handleSearch();
  }

  render() {

    const {
      term,
      selectedSubjectFields,
      dictentries,
      queryTime,
      count,
      loading
    } = this.props;

    return (
      <div className="app-container">
        <Progress loading={loading}/>
        <div className="container content">
          <div className="row search-row">
            <div className="col-sm-8 search-bar">
              <LiveSearch handleSearch={this.handleSearch} selectedSubjectFields={selectedSubjectFields} term={term}/>
            </div>
          </div>
          <div className="row results">
            <div className="col-sm-8 terms">
              <DictentryList dictentries={dictentries} siteUrl={config.siteUrl} queryTime={queryTime} count={count}/>
            </div>
            <div className="col-sm-4 subject-fields">
              <SubjectFieldList selectedSubjectFields={selectedSubjectFields} dictentries={dictentries} handleSubjectFieldToggle={this.handleSubjectFieldToggle}/>
            </div>
          </div>
          <Footer siteUrl={config.siteUrl}/>
        </div>
      </div>
    );
  }
}

TermSearchView.propTypes = propTypes;
TermSearchView.defaultProps = defaultProps;

export default connect(({
  selectedSubjectFields,
  dictentries,
  term,
  queryTime,
  count,
  loading
}) => ({
  selectedSubjectFields,
  dictentries,
  term,
  queryTime,
  count,
  loading
}))(TermSearchView);
