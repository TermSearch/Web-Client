import React, { PropTypes } from 'react';
import SubjectFieldInput from './SubjectFieldInput';

const propTypes = {
  handleSubjectFieldToggle: PropTypes.func.isRequired,
  selectedSubjectFields: PropTypes.array,
  dictentries: PropTypes.array,
};

const defaultProps = {
  dictentries: [],
  selectedSubjectFields: [],
};

const extractSubjectFields = (dictentries) => {
  const all = [];
  dictentries.forEach(dictEntry => {
    dictEntry.subjectFields.forEach(subjectField => {
      all.push(subjectField.termStr);
    });
  });
  return all;
};

const mergeSubjectFields = (subjectFields, selectedSubjectFields) => {
  return subjectFields.concat(selectedSubjectFields);
}

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

const isSelected = (selectedSubjectFields, subjectField) => (selectedSubjectFields.indexOf(subjectField) > -1);

function SubjectFieldList(props) {
  const { dictentries, selectedSubjectFields, handleSubjectFieldToggle } = props;

  // Extract subjectFields from API response
  const extractedSubjectFields = extractSubjectFields(dictentries);
  // Merge with selectedSubjectFields
  const mergedSubjectFields = selectedSubjectFields.concat(extractedSubjectFields);
  // Filter duplicates and sort alphabetically
  const sortedSubjectFields = filterDuplicates(mergedSubjectFields).sort();

  // Only render label if contents
  const label = (sortedSubjectFields.length > 0) ? (<h6>Vakgebied</h6>) : '';
  return (
      <div>
        {label}
        <ul className="subjectfield-list">
          {sortedSubjectFields.map((subjectField, i) => (
              <SubjectFieldInput
                active={isSelected(selectedSubjectFields, subjectField)}
                key={i}
                subjectField={subjectField}
                handleSubjectFieldToggle={handleSubjectFieldToggle}
              />
            )
        )}
        </ul>
    </div>
  );
}

SubjectFieldList.propTypes = propTypes;
SubjectFieldList.defaultProps = defaultProps;

export default SubjectFieldList;
