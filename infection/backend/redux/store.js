const { createStore } = require('redux');

const reducer = require('./root_reducer');

module.exports = createStore(reducer);

// console.log(module.exports);
console.log(module.exports.getState());
console.log(module.exports.getState().test);