import React, { PropTypes } from 'react';
import SubjectFieldButton from './SubjectFieldButton';

const propTypes = {
  handleSubjectFieldChange: PropTypes.func.isRequired,
  dictentries: PropTypes.array,
};

const defaultProps = {
  dictentries: [],
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
  const dictentries = props.dictentries;
  const handleSubjectFieldChange = props.handleSubjectFieldChange;
  const subjectFields = filterSubjectFields(dictentries);
  return (
    <ul>
      {subjectFields.map((subjectField, i) => (
          <SubjectFieldButton
            key={i}
            subjectFieldStr={subjectField}
            handleSubjectFieldChange={handleSubjectFieldChange}
          />
        )
    )}
    </ul>
  );
}

SubjectFieldList.propTypes = propTypes;
SubjectFieldList.defaultProps = defaultProps;

export default SubjectFieldList;
