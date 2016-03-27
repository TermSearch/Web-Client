import React, { PropTypes } from 'react';

const propTypes = {
  subjectField: PropTypes.string.isRequired,
  handleSubjectFieldChange: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

function SubjectFieldButton(props) {
  const { subjectField, handleSubjectFieldChange, active } = props;
  const onChange = (e) => handleSubjectFieldChange(e.target.value);
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

SubjectFieldButton.propTypes = propTypes;

export default SubjectFieldButton;
