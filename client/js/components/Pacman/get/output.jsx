var React = require('react');
var Style = require('../Style.jsx');

function getActionString (action) {
  if (action === 0) {
    return "";
  } else if (action === 1) {
    return "up";
  } else if (action === 2) {
    return "right";
  } else if (action === 3) {
    return "down";
  } else if (action === 4) {
    return "left";
  }
}

module.exports = function (state) {
  return (
    <div className="col-lg-6 col-xs-12">
      <h3 style={{marginTop:"0px"}}>Output</h3>
      <div>
        {"Action: " + getActionString(state.action)}
      </div>
      <div>
        {"Reward: " + state.reward}
      </div>
      <div>
        {"Score: " + state.score}
      </div>
      <div>
        {"Generation: " + state.generation}
      </div>
    </div>
  )
}
