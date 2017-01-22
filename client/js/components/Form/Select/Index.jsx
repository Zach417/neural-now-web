var React = require('react');
var Style = require('./Style.jsx');

var FormSelect = React.createClass({
  getInitialState: function () {
    return {
      isHovered: false,
      isFocused: false,
      allowNulls: true,
    }
  },

  componentWillMount: function () {
    if (this.props.allowNulls != '' && this.props.allowNulls === false) {
      var state = this.state;
      state.allowNulls = false;
      this.setState(state);
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.allowNulls != '' && nextProps.allowNulls === false) {
      var state = this.state;
      state.allowNulls = false;
      this.setState(state);
    }
  },

  render: function() {
    return (
      <select
        style={Style.select}
        value={this.props.value}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onChange={this.handleChange}>
        {this.getOptions()}
      </select>
    )
  },

  getOptions: function () {
    var options = [];

    if (this.state.allowNulls == true) {
      options.push(
        <option key={"null"} value="" />
      )
    }

    options = this.props.options.map(function (option, i) {
      var key = "option-" + option.label + "-" + i;
      if (typeof option === "string") {
        return (
          <option key={key} value={option}>{option}</option>
        )
      }
      return (
        <option key={key} value={option.value}>{option.label}</option>
      )
    });

    return options;
  },

  getStyle: function () {
    var style = Style.select;
    if (this.state.isHovered === true) {
      style = Style.selectHovered;
      if (this.state.isFocused === true) {
        style = Style.selectHoveredFocused
      }
    } else if (this.state.isFocused === true) {
      if (this.state.isFocused === true) {
        style = Style.selectFocused
      }
    }
    return style;
  },

  handleMouseEnter: function () {
    this.setState({
      isHovered: true,
      isFocused: this.state.isFocused,
      allowNulls: this.state.allowNulls,
    });
  },

  handleMouseLeave: function () {
    this.setState({
      isHovered: false,
      isFocused: this.state.isFocused,
      allowNulls: this.state.allowNulls,
    });
  },

  handleFocus: function () {
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: true,
      allowNulls: this.state.allowNulls,
    });
  },

  handleBlur: function () {
    this.setState({
      isHovered: this.state.isHovered,
      isFocused: false,
    });
  },

  handleChange: function (event) {
    var value = event.target.value;
    if (this.props.attribute) {
      this.props.onChange(this.props.attribute, value);
    } else {
      this.props.onChange(value);
    }
  },
});

module.exports = FormSelect;
