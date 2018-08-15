const { createStore } = require('redux');

const reducer = require('./rootreducer');

module.exports = createStore(reducer);