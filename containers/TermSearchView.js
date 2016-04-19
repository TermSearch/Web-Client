import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchInput from '../components/SearchInput';
import LiveSearch from '../components/LiveSearch';
import DictentryList from '../components/DictentryList';
import SubjectFieldList from '../components/SubjectFieldList';
import {
  toggleSubjectField,
  setTerm,
  fetchDictentries,
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

  fetchFromLocation({ query: { term } }) {
    this.handleSearch(term);
  }

  handleSearch(term) {
    const { dispatch } = this.props;
    dispatch(setTerm(term));
    // Only dispatch search query if term contains content
    if (term) dispatch(fetchDictentries());
  }

  handleSubjectFieldToggle(subjectField) {
    const { dispatch } = this.props;
    dispatch(toggleSubjectField(subjectField));
    dispatch(fetchDictentries());
  }

  render() {
    const { term, selectedSubjectFields, dictentries } = this.props;
    return (
      <div className="app container">
        <div className="row input-row">
          <div className="col-sm-8 col-sm-offset-4">
            <LiveSearch
              selectedSubjectFields={selectedSubjectFields}
              handleSearch={this.handleSearch}
            />
          </div>
        </div>
        <div className="row results-row">
          <div className="col-sm-4">
            <p>Vakgebied</p>
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

export default connect(({ term, selectedSubjectFields, dictentries }) => ({
  term,
  selectedSubjectFields,
  dictentries,
}))(TermSearchView);
