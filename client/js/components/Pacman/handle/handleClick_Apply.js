var deepqlearn = require('../deepqlearn');

function containsPacman (maze, x, y) {
  return (maze.pacman.pos.x === x && maze.pacman.pos.y === y);
}

function containsMegaFood (maze, x, y) {
  var result = false;
  for (var i = 0; i < maze.megaFood.length; i++) {
    var megaFood = maze.megaFood[i];
    if (megaFood.x === x && megaFood.y === y) {
      result = true;
    }
  }
  return result;
}

function containsFood (maze, x, y) {
  var result = false;
  for (var i = 0; i < maze.food.length; i++) {
    var food = maze.food[i];
    if (food.x === x && food.y === y) {
      result = true;
    }
  }
  return result;
}

function containsGhost (maze, x, y) {
  var result = false;
  for (var i = 0; i < maze.ghosts.length; i++) {
    var ghost = maze.ghosts[i];
    if (ghost.pos.x === x && ghost.pos.y === y) {
      result = true;
    }
  }
  return result;
}

function getMazeState () {
  var maze = iFrameWindow.maze;
  var result = [];

  for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 20; j++) {
      result.push(maze.contains(i, j) ? 1: 0); // grid block
      result.push(containsGhost(maze, i, j) ? 1: 0);
      result.push(containsFood(maze, i, j) ? 1: 0);
      result.push(containsMegaFood(maze, i, j) ? 1: 0);
      result.push(containsPacman(maze, i, j) ? 1: 0);
    }
  }

  return result;
}

module.exports = function (value, component) {
  var state = component.state;
  var model = component.state.model;
  var brain = component.state.brain;
  var learn = function () { };

  num_actions = 5; // do nothing, up, right, down, left
  num_inputs = 1500;

  try {
    eval(model);

    var maze = iFrameWindow.maze;
    var lastReward = 0;
    maze.onStep = function () {
      var pacman = iFrameWindow.maze.pacman;
      var reward = pacman.score - lastReward;
      lastReward = pacman.score;

      var mazeState = getMazeState();
      brain.learning = (state.type === "training");
      var action = learn(mazeState, reward);

      var newState = component.state;
      newState.action = action;
      newState.reward = reward;
      newState.score = pacman.score;
      component.setState(newState);

      if (action === 1) {
        pacman.setDir(0,-1); // UP_ARROW
      } else if (action === 2) {
        pacman.setDir(1,0); // RIGHT_ARROW
      } else if (action === 3) {
        pacman.setDir(0,1); // DOWN_ARROW
      } else if (action === 4) {
        pacman.setDir(-1,0); // LEFT_ARROW
      }
    }

    maze.onDeath = function (score) {
      var maze = iFrameWindow.maze;
      maze.start();

      var newState = component.state;
      newState.generation++;
      component.setState(newState);
    }

    maze.onVictory = function (score) {
      var maze = iFrameWindow.maze;
      maze.start();

      var newState = component.state;
      newState.generation++;
      component.setState(newState);
    }
  } catch (ex) {
    state.error = ex.message;
    component.setState(state);
  }
}
