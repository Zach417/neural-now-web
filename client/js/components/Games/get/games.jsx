var React = require('react');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Style = require('../Style.jsx');
var Button = require('../../Button/Index.jsx');

function getGriddleData (state) {
  var result = [];
  for (var i = 0; i < state.games.length; i++) {
    result.push({
      "Name": state.games[i],
    });
  }
  return result;
}


function handleClick_Row (gridRow, group) {
  browserHistory.push("/games/" + gridRow.props.data["Name"]);
}

module.exports = function (state) {
  var loaded = state.loaded;
  if (loaded) {
    return (
      <div className="col-lg-10 col-xs-12 col-centered">
        <Griddle
          results={getGriddleData(state)}
          columns={["Name"]}
          resultsPerPage={20}
          onRowClick={handleClick_Row} />
      </div>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <Griddle
        results={[{"Is it loading?":"It is definitely loading..."}]}
        columns={["Is it loading?"]}
        resultsPerPage={20} />
    </div>
  )
}
