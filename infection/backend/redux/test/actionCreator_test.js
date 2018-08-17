const { HEY_WORLD } = require('./actions_test');

const sayHello = (hello) => ({
  type: HEY_WORLD,
  hello
})

const sayGoodbye = (hello) => ({
  type: GOODBYE_WORLD,
  hello
})

module.exports = {
  sayHello,
  sayGoodbye
}
