import React from 'react';

var component = React.createClass({

  render: function() {

    var visibility = (this.props.loading) ? 'visible' : 'hidden';

    var style = {
      position: 'relative',
      marginTop: 0,
      width: '100%',
      height: 1,
      visibility: visibility,
    };

    return (
      <div className="load-bar" style={style} >
        <div className="bar">{this.props.children}</div>
        <div className="bar">{this.props.children}</div>
        <div className="bar">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = component;
