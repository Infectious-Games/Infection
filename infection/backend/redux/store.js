const { createStore } = require('redux');

const reducer = require('./root_reducer');

module.exports = createStore(reducer);