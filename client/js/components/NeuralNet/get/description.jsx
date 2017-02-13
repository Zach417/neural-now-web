var React = require('react');
var Style = require('../Style.jsx');

function getAuthors(state) {
  var net = state.neuralNetwork;
  if (net.authors.length > 0) {
    return (
      <div>
        <b>{"Authors: "}</b>
        {net.authors.map(function (author, index) {
          if (index + 1 < net.authors.length) {
            return (
              <span key={"author-" + index}>
                <a target="_blank" href={author.url}>{author.name}</a>
                {", "}
              </span>
            )
          } else {
            return (
              <span key={"author-" + index}>
                <a target="_blank" href={author.url}>{author.name}</a>
              </span>
            )
          }
        })}
      </div>
    )
  }
}

function getPaper (state) {
  var paper = state.neuralNetwork.paper || {};
  if (paper.name && paper.url) {
    return (
      <div>
        <b>{"Paper: "}</b>
        <a target="_blank" href={paper.url}>{paper.name}</a>
      </div>
    )
  }
}

function getGithub (state) {
  var net = state.neuralNetwork
  if (net.github) {
    return (
      <div>
        <b>{"Github: "}</b>
        <a target="_blank" href={net.github}>{net.github}</a>
      </div>
    )
  }
}

function getAbstract (state) {
  var net = state.neuralNetwork
  if (net.abstract) {
    return (
      <div>
        <b>{"Abstract: "}</b>
        {net.abstract}
      </div>
    )
  }
}

module.exports = function (state) {
  var loaded = state.loadedDetails;
  var body;
  if (loaded) {
    body = (
      <div>
        <div>
          <b>{"Date: "}</b>
          {state.neuralNetwork.date}
        </div>
        {getAuthors(state)}
        {getPaper(state)}
        {getGithub(state)}
        {getAbstract(state)}
      </div>
    )
  } else {
    body = (
      <div>
        {"Loading detail module..."}
      </div>
    )
  }

  return (
    <div className="col-lg-10 col-xs-12 col-centered">
      <div style={Style.detail}>
        {body}
      </div>
    </div>
  )
}
