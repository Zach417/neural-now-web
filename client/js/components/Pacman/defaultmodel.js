module.exports = "\
var temporal_window = 3;\n\
var network_size = num_inputs * temporal_window + num_actions * temporal_window + num_inputs;\n\
\n\
var layer_defs = [];\n\
layer_defs.push({type: 'input', out_sx: 1, out_sy: 1, out_depth: network_size});\n\
layer_defs.push({type:'fc', num_neurons: 5, activation:'relu'});\n\
layer_defs.push({type: 'regression', num_neurons: num_actions});\n\
\n\
var tdtrainer_options = {\n\
  learning_rate: 0.01,\n\
  momentum: 0.9,\n\
  batch_size: 64,\n\
  l2_decay: 0.01\n\
};\n\
\n\
var opt = {};\n\
opt.temporal_window = temporal_window;\n\
opt.experience_size = 3000;\n\
opt.start_learn_threshold = 500;\n\
opt.gamma = 0.7;\n\
opt.learning_steps_total = 10000;\n\
opt.learning_steps_burnin = 1000;\n\
opt.epsilon_min = 0.0;\n\
opt.epsilon_test_time = 0.0;\n\
opt.layer_defs = layer_defs;\n\
opt.tdtrainer_options = tdtrainer_options;\n\
\n\
// You must define these outputs in your model\n\
brain = new deepqlearn.Brain(num_inputs, num_actions, opt);\n\
learn = function (state, lastReward) {\n\
  brain.backward(lastReward);\n\
  var action = brain.forward(state);\n\
  return action;\n\
}";
