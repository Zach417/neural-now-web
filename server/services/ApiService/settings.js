module.exports = function () {
  var result = {};
  switch(process.env.NODE_ENV){
    case 'development':
      result.host = "localhost";
      result.port = 8080;
      break;
    default:
      result.host = "api.neuralnow.com";
      result.port = 80;
      break;
  }
  return result;
};
