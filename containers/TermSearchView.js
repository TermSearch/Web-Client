import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import LiveSearch from '../components/LiveSearch';
import Progress from '../components/ProgressBar';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';
import Pagination from '../components/Pagination';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import config from '../config/config';

import {
  toggleSubjectField,
  setTerm,
  fetchDictentries,
  setSelectedSubjectFields,
  setPage,
} from '../actions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  selectedSubjectFields: PropTypes.array,
  term: PropTypes.string,
  dictentries: PropTypes.array,
  queryTime: PropTypes.number,
  count: PropTypes.number,
  loading: PropTypes.bool,
  page: PropTypes.number,
};

const defaultProps = {
  term: '',
  selectedSubjectFields: [],
  dictentries: [],
  loading: false,
  page: 1
};

class TermSearchView extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSubjectFieldToggle = this.handleSubjectFieldToggle.bind(this);
    this.handleSetPage = this.handleSetPage.bind(this);
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
      selectedSubjectFields,
      page,
    }
  }) {
    const {dispatch} = this.props;
    const pageNr = parseInt(page, 10);
    // Convert selectedSubjectFields to array if string
    if (selectedSubjectFields && selectedSubjectFields.constructor === String)
      selectedSubjectFields = [selectedSubjectFields];
    dispatch(setSelectedSubjectFields(selectedSubjectFields));
    dispatch(setTerm(term));
    dispatch(setPage(pageNr));
    dispatch(fetchDictentries())
  }

  handleSearch() {
    const {dispatch} = this.props;
    dispatch(setPage(1));
    dispatch(fetchDictentries());
  }

  handleSubjectFieldToggle(subjectField) {
    const {dispatch} = this.props;
    dispatch(toggleSubjectField(subjectField));
    dispatch(setPage(1));
    dispatch(fetchDictentries());
  }

  handleSetPage(pageNr) {
    const {dispatch} = this.props;
    dispatch(setPage(pageNr));
    dispatch(fetchDictentries());
  }

  render() {

    const {
      term,
      selectedSubjectFields,
      dictentries,
      queryTime,
      count,
      loading,
      page,
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
          <div className="row">
              <div className="col-sm-8 text-center">
                <Pagination page={page} count={count} handleSetPage={this.handleSetPage} />
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
  loading,
  page,
}) => ({
  selectedSubjectFields,
  dictentries,
  term,
  queryTime,
  count,
  loading,
  page,
}))(TermSearchView);
