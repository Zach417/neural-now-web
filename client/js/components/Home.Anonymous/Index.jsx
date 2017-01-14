var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var HomePage = React.createClass({
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
							$ npm i neural-now
						</pre>
						<pre>
							{"var NeuralNow = require('neural-now');"}<br />
							{"var NeuralNowUtil = require('neural-now-util');"}<br />
							<br />
							{"NeuralNow.get('image-classification', function(neuralNet) {"}<br />
							{"    var image = NeuralNowUtil.image.fileToVector('dog.png');"}<br />
							{"    var prediction = neuralNet.forward(image);"}<br />
							{"    console.log(prediction);"}<br />
							{"});"}
						</pre>
						<pre>
							{">>> Dog"}
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
							$ npm i neural-now
						</pre>
						<p>
							{"To deploy your first neural net, use the NeuralNow.get() function."}
						</p>
						<pre>
							{"var NeuralNow = require('neural-now');"}<br />
							{"NeuralNow.get('sine', function(neuralNet) {"}<br />
							<br />
							{"    var input = Math.PI / 3;"}<br />
							{"    var output = neuralNet.forward(input);"}<br />
							{"    console.log(output);"}<br />
							{"});"}
						</pre>
						<pre>
							{">>> 0.86602540378"}
						</pre>
						<p>
							Any public neural network on Neural Now can be deployed by
							replacing "sine" in the above snippet with the appropriate id of
							the network. Of course, don't forget that the input must match
							the neural network's specifications and the output will also
							vary accordingly!
						</p>
						<h3>Mission</h3>
						<p>
							My mission is to make it possible for the next Zuckerberg to
							build something profoundly useful.
						</p>
						<p>
							The next Mark Zuckerberg won't build Facebook, according to
							Peter Theil. The world doesn't need another social network app.
							The next dorm room hacker will build a humanoid robot that cleans
							your house while you're at work or even a chat bot capable of
							filing your taxes. Whatever it is, it will require open access to
							state of the art AI, and I'm going to make sure they have it.
							Neural Now is a service that will power the next wave of Pages,
							Brins, and Zuckerburgs by giving them access to hundreds of
							neural networks, each trained to solve specific domain problems.
						</p>
					</div>
	      </div>
			</div>
    );
  },
});

module.exports = HomePage;
