var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');
var NeuralNetCanvas = require('../NeuralNetCanvas/Index.jsx');
var NeuralNetCode = require('../NeuralNetCode/Index.jsx');
var NeuralNetTest = require('../NeuralNetTest/Index.jsx');
var NeuralNetworkStore = require('../../stores/NeuralNetworkStore');

var Component = React.createClass({
  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
	    	<div className="row">
          <div className="col-lg-10 col-xs-12 col-centered">
            <h1>{"Deploy someone else's neural network"}</h1>
          </div>
        	<div className="col-lg-10 col-xs-12 col-centered">
        		<NeuralNetCanvas name={"sine"} />
        	</div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row" style={{backgroundColor: "#1487BF", color: "white"}}>
          <div className="col-xs-12" style={{paddingTop:"15px"}} />
        	<div className="col-lg-10 col-xs-12 col-centered">
            <h3>
              {"Lord, give me a Math.sin()"}
            </h3>
            <p>
              {"With our open source libraries and packages, "}
              {"it's never been easier to leverage machine learning "}
              {"in your projects."}
            </p>
          </div>
          <div className="col-lg-10 col-xs-12 col-centered">
            <NeuralNetCode name={"sine"} />
          </div>
          <div className="col-xs-12" style={{paddingBottom:"15px"}} />
        </div>
        <div className="row">
          <div className="col-lg-10 col-xs-12 col-centered">
            <h3>
              {"You can even test it out here!"}
            </h3>
          </div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<NeuralNetTest name={"sine"} />
					</div>
	      </div>
        <div className="row">
          <div className="col-xs-12" style={{paddingTop:"75px"}} />
          <div className="col-lg-10 col-xs-12 col-centered">
            <h3>
              {"Learn more about Neural Now by clicking "}
              <Link to="/about">here</Link>
              {" or you can search public neural networks "}
              <Link to="/neuralnetwork">here</Link>.
            </h3>
          </div>
          <div className="col-xs-12" style={{paddingBottom:"50px"}} />
        </div>
			</div>
    );
  },
});

module.exports = Component;
