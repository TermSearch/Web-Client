import React, { PropTypes } from 'react';

const propTypes = {
  subjectFieldStr: PropTypes.string.isRequired,
  handleSubjectFieldChange: PropTypes.func.isRequired,
};

function SubjectFieldButton(props) {
  const { subjectFieldStr, handleSubjectFieldChange } = props;
  const onClick = (e) => handleSubjectFieldChange(e.target.value);
  return (
    <button
      className="subjectfield-button"
      value={subjectFieldStr}
      name={subjectFieldStr}
      onClick={onClick}
    >
      {subjectFieldStr}
    </button>
  );
}

SubjectFieldButton.propTypes = propTypes;

export default SubjectFieldButton;
