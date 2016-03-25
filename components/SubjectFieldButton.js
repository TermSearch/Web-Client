import React, { PropTypes } from 'react';

const propTypes = {
  subjectField: PropTypes.string.isRequired,
  handleSubjectFieldsChange: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

function SubjectFieldButton(props) {
  const { subjectField, handleSubjectFieldsChange, active } = props;
  const onChange = (e) => handleSubjectFieldsChange(e.target.value);
  return (
      <span className="subjectfield-radio">
        <input
          type="radio"
          name={subjectField}
          checked={active}
          value={subjectField}
          onChange={onChange}
        />
        <span> {subjectField}</span>
        <br />
      </span>
  );
}

SubjectFieldButton.propTypes = propTypes;

export default SubjectFieldButton;
