import React, { PropTypes } from 'react';

const propTypes = {
  subjectField: PropTypes.string.isRequired,
  handleSubjectFieldToggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

function SubjectFieldInput(props) {
  const { subjectField, handleSubjectFieldToggle, active } = props;
  const onChange = (e) => handleSubjectFieldToggle(e.target.value);
  return (
      <span className="subjectfield-checkbox">
        <input
          type="checkbox"
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

SubjectFieldInput.propTypes = propTypes;

export default SubjectFieldInput;
