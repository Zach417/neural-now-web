var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  componentDidMount: function () {
    Prism.highlightAll();
  },

  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
	    	<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
						<h1>Neural Now</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
						<p>
							Neural Now is a neural network sharing service that makes it
							possible to deploy someone else's trained neural network in
							seconds. It{"'"}s by far the easiest way to leverage machine
							learning in your own tools and services.
						</p>
						<p>
							This is how you can deploy an image classification model in under 10 lines of code.
						</p>
            <pre>
  						<code className="language-javascript">
                {"var NeuralNow = require('neural-now');"}{"\n"}
  							{"var NeuralNowUtil = require('neural-now-util');"}{"\n"}
  							{"\n"}
  							{"NeuralNow.get('image-classification', function(neuralNet) {"}{"\n"}
  							{"    var image = NeuralNowUtil.image.fileToVector('dog.png');"}{"\n"}
  							{"    var prediction = neuralNet.forward(image);"}{"\n"}
  							{"    console.log(prediction);"}{"\n"}
  							{"});"}
  						</code>
            </pre>
            <pre>
  						<code className="language-bash">
  							{">>> Dog"}
  						</code>
            </pre>
						<p>
							Neural Now currently supports deployment on Node.js and Python
							applications via npm and pip packages, with plans to develop C#,
							Java, and Swift libraries in the near future.
						</p>
						<h3>Installation - Node.js</h3>
						<p>
							After you've installed Node.js, install Neural Now with the
							following npm command.
						</p>
            <pre>
  						<code className="language-bash">
  							{"$ npm i neural-now"}
              </code>
						</pre>
						<p>
							{"To deploy your first neural net, use the NeuralNow.get() function."}
						</p>
            <pre>
  						<code className="language-javascript">
  							{"var NeuralNow = require('neural-now');"}{"\n"}
  							{"NeuralNow.get('sine', function(neuralNet) {"}{"\n"}
  							{"    var input = Math.PI / 3;"}{"\n"}
  							{"    var output = neuralNet.forward(input);"}{"\n"}
  							{"    console.log(output);"}{"\n"}
  							{"});"}
              </code>
						</pre>
            <pre>
  						<code className="language-bash">
			         {">>> 0.86602540378"}
             </code>
						</pre>
						<p>
							Any public neural network on Neural Now can be deployed by
							replacing "sine" in the above snippet with the appropriate id of
							the network. Of course, don't forget that the input must match
							the neural network's specifications and the output will also
							vary accordingly!
						</p>
					</div>
	      </div>
			</div>
    );
  },
});

module.exports = Component;
