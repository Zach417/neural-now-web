var React = require('react');
var Link = require('react-router').Link;
var Style = require('./Style.jsx');

var Component = React.createClass({
  render: function(){
    return (
    	<div className="container-fluid" style={Style.container}>
	    	<div className="row">
					<div className="col-lg-10 col-xs-12 col-centered">
						<h1>About</h1>
					</div>
					<div className="col-lg-10 col-xs-12 col-centered">
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

module.exports = Component;
