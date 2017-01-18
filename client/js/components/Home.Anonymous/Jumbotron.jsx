var React = require('react');
var browserHistory = require('react-router').browserHistory;
var $ = require('jquery');
var Style = require('./Style.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
    }
  },

  render: function() {
    return (
      <div
        className="row"
        style={this.getStyle()}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="col-lg-8 col-xs-12 col-centered"
          style={{padding:"0px"}}>
					<h1 style={{margin:"0px",padding:"50px 0px"}}>
            Search neural networks now!
          </h1>
        </div>
      </div>
    );
  },

  getStyle: function () {
    var style = Style.jumbotron;
    if (this.state.isHovered === true) {
      style = Style.jumbotronHovered;
    }
    return style;
  },

  handleClick: function () {
    browserHistory.push("/neuralnetwork");
  },

  handleMouseEnter: function () {
    this.setState({
      isHovered: true,
    });
  },

  handleMouseLeave: function () {
    this.setState({
      isHovered: false,
    });
  },
});

module.exports = Component;
