import React from 'react';

function ProgressBar() {

  var visibility = (this.props.loading)
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

export default ProgressBar