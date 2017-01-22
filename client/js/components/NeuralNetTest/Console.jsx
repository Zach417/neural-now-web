var React = require('react');
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function () {
    return (
      <pre>
				<code
          className="language-bash"
          dangerouslySetInnerHTML={this.getMarkup()}>
				</code>
      </pre>
    );
  },

  getMarkup: function () {
    var code = ">>> " + this.props.result;
    return {
      __html: Prism.highlight(code, Prism.languages.bash)
    };
  },
});

module.exports = Component;
