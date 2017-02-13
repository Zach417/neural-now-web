var React = require('react');
var Griddle = require('griddle-react');
var Style = require('../Style.jsx');

function getGriddleData (state) {
  var files = state.neuralNetwork.files;
  var result = [];
  for (var i = 0; i < files.length; i++) {
    result.push({
      "File": files[i],
    });
  }
  return result;
}

module.exports = function (state) {
  var files = state.neuralNetwork.files;
  var loaded = state.loadedDetails;
  var body;

  // currently no back-end service to support download of files
  return (
    <div />
  )

  if (loaded) {
    if (files.length > 0) {
      body = (
        <div>
          <p>{"Click on a file below to begin download."}</p>
          <Griddle
            results={getGriddleData(state)}
            columns={["File"]}
            resultsPerPage={20}
            onRowClick={this.handleClick_Row} />
        </div>
      )
    } else {
      body = (
        <div>
          <p>{"There are no files associated with this model."}</p>
        </div>
      )
    }
  } else {
    body = (
      <div>
        {"Loading file module..."}
      </div>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <h3>Files</h3>
      {body}
    </div>
  )
}
