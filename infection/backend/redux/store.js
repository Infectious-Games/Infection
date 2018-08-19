const { createStore } = require('redux');
const reducer = require('./root_reducer');

let store = createStore(reducer);

module.exports = store;
