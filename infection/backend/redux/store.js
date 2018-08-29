const { createStore } = require('redux');
const reducer = require('./root_reducer');

const store = createStore(reducer);

module.exports = store;
