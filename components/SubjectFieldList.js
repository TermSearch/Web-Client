import React, { PropTypes } from 'react';
import SubjectFieldButton from './SubjectFieldButton';

const propTypes = {
  handleSubjectFieldToggle: PropTypes.func.isRequired,
  selectedSubjectFields: PropTypes.array,
  dictentries: PropTypes.array,
};

const defaultProps = {
  dictentries: [],
  selectedSubjectFields: [],
};

const filterDuplicates = (arr) => {
  const onlyUniques = [];
  arr.forEach(entry => {
    let unique = true;
    onlyUniques.forEach(uniqueEntry => {
      if (uniqueEntry === entry) unique = false;
    });
    if (unique) onlyUniques.push(entry);
  });
  return onlyUniques;
};

const filterSubjectFields = (dictentries) => {
  const all = [];
  dictentries.forEach(dictEntry => {
    dictEntry.subjectFields.forEach(subjectField => {
      all.push(subjectField.termStr);
    });
  });
  return filterDuplicates(all);
};

function SubjectFieldList(props) {
  const { dictentries, selectedSubjectFields, handleSubjectFieldToggle } = props;
  const subjectFieldsInResults = filterSubjectFields(dictentries);
  // console.log(`In SubjectFieldList: ${selectedSubjectFields}`);
  return (
    <ul>
      {subjectFieldsInResults.map((subjectFieldInResult, i) => (
          <SubjectFieldButton
            active={(selectedSubjectFields.indexOf(subjectFieldInResult) > -1)}
            key={i}
            subjectField={subjectFieldInResult}
            handleSubjectFieldToggle={handleSubjectFieldToggle}
          />
        )
    )}
    </ul>
  );
}

SubjectFieldList.propTypes = propTypes;
SubjectFieldList.defaultProps = defaultProps;

export default SubjectFieldList;
