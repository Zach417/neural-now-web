var React = require('react');
var Style = require('../Style.jsx');

module.exports = function (state) {
  return (
    <div className="col-lg-6 col-xs-12">
      <iframe
        id="pacman"
        style={Style.iframe}
        scrolling="no"
        src="/iframes/pacman.html" />
    </div>
  )
}
