var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  getInitialState: function () {
    return {
      menuItems: [],
    }
  },

  componentWillMount: function () {
    var state = this.state;
    state.menuItems = this.getMenuItems(this.props.inputType, this.props.selected, this.props.onChange);
    this.setState(state);
  },

  componentWillReceiveProps: function (nextProps) {
    var state = this.state;
    state.menuItems = this.getMenuItems(nextProps.inputType, nextProps.selected, nextProps.onChange);
    this.setState(state);
  },

  render: function () {
    return (
      <div className="container-fluid">
        <div className="row" style={{backgroundColor: "rgb(3, 90, 132)", color: "white"}}>
          {this.state.menuItems}
        </div>
      </div>
    );
  },

  getMenuItems: function (type, selected, onChange) {
    var items = ["Vector", "Text", "Image", "Audio"];
    if (type) {
      type = type.toLowerCase();
    }
    return items.map(function (item) {
      var style = {
        border: "1px solid #222",
        paddingTop: "10px",
        paddingBottom: "10px",
      };

      var handleClick = function () {

      }

      if (type !== item.toLowerCase()) {
        style.color = "grey";
      } else {
        style.cursor = "pointer";
        handleClick = function () {
          onChange(item.toLowerCase());
        }.bind(this);
      }

      if (selected.toLowerCase() == item.toLowerCase()) {
        style.color = "black";
        style.backgroundColor = "white";
      }

      return (
        <div
          key={item}
          className="col-xs-3"
          style={style}
          onClick={handleClick}>
          {item}
        </div>
      )
    }.bind(this));
  },
});

module.exports = Component;
