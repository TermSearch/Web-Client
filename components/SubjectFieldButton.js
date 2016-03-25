import React, { PropTypes } from 'react';

const propTypes = {
  subjectField: PropTypes.string.isRequired,
  handleSubjectFieldsChange: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

function SubjectFieldButton(props) {
  const { subjectField, handleSubjectFieldsChange, active } = props;
  const onClick = (e) => handleSubjectFieldsChange(e.target.value);
  let classNames = 'subjectfield-button';
  if (active) classNames += ' active';
  return (
    <button
      className={classNames}
      active={active}
      value={subjectField}
      onClick={onClick}
    >
      {subjectField}
    </button>
  );
}

SubjectFieldButton.propTypes = propTypes;

export default SubjectFieldButton;
