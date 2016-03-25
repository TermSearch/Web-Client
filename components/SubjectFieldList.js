import React, { PropTypes } from 'react';
import SubjectFieldButton from './SubjectFieldButton';

const propTypes = {
  handleSubjectFieldsChange: PropTypes.func.isRequired,
  subjectFields: PropTypes.array,
  dictentries: PropTypes.array,
};

const defaultProps = {
  dictentries: [],
  subjectFields: [],
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

// Returns true is array contains element
const arrayContains = (array, element) => array.indexOf(element) > -1;


function SubjectFieldList(props) {
  const { dictentries, subjectFields, handleSubjectFieldsChange } = props;
  const subjectFieldsInResults = filterSubjectFields(dictentries);
  // console.log(subjectFields);
  return (
    <ul>
      {subjectFieldsInResults.map((subjectFieldInResult, i) => (
          <SubjectFieldButton
            active={arrayContains(subjectFields, subjectFieldInResult)}
            key={i}
            subjectField={subjectFieldInResult}
            handleSubjectFieldsChange={handleSubjectFieldsChange}
          />
        )
    )}
    </ul>
  );
}

SubjectFieldList.propTypes = propTypes;
SubjectFieldList.defaultProps = defaultProps;

export default SubjectFieldList;
