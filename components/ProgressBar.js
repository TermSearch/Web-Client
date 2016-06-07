import React, { PropTypes } from 'react';

const propTypes = {
  loading: PropTypes.bool,
};

function ProgressBar({ loading }) {

  var visibility = (loading)
    ? 'visible'
    : 'hidden';

  var style = {
    position: 'relative',
    marginTop: 0,
    width: '100%',
    height: 1,
    visibility: visibility
  };

  return (
    <div className="load-bar" style={style}>
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
}

ProgressBar.propTypes = propTypes;

export default ProgressBar
