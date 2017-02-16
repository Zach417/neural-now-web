var React = require('react');
var Griddle = require('griddle-react');
var browserHistory = require('react-router').browserHistory;
var Style = require('../Style.jsx');
var Button = require('../../Button/Index.jsx');

function getAuthorString(authors) {
  authors = authors || [];
  if (authors.length >= 3) {
    return authors[0].name + " et al."
  } else if (authors.length == 2) {
    return authors[0].name + " & " + authors[1].name;
  } else if (authors.length == 1) {
    return authors[0].name;
  } else {
    return "";
  }
}

function filterScores (models) {
  var result = [];
  var threshold = 0.25;

  // apply threshold
  for (var i = 0; i < models.length; i++) {
    var rank = models[i].rank || 1;
    if (rank > threshold) {
      result.push(models[i]);
    }
  }

  // sort descending by rank
  result.sort(function (a, b) {
    return parseFloat(b.rank) - parseFloat(a.rank);
  });

  return result;
}

function getGriddleData (state) {
  var result = [];
  var models = filterScores(state.models);
  for (var i = 0; i < models.length; i++) {
    result.push({
      "Name": models[i].name,
      "Authors": getAuthorString(models[i].authors),
      "Input Type": models[i].inputType,
      "Description": models[i].description,
    });
  }
  return result;
}


function handleClick_Row (gridRow, group) {
  browserHistory.push("/neuralnetwork/" + gridRow.props.data["Name"]);
}

module.exports = function (state) {
  var loaded = state.loaded;
  if (loaded) {
    return (
      <div className="col-lg-10 col-xs-12 col-centered">
        <Griddle
          results={getGriddleData(state)}
          columns={["Name", "Authors", "Input Type", "Description"]}
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
