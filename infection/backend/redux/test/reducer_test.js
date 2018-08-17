const { HEY_WORLD, GOODBYE_WORLD } = require('./actions_test');
const initialState = require('./initialState_test')

const howdy = (state = initialState, action) => {
  switch (action.type) {
    case HEY_WORLD:
      return {
        hello: 'world',
        completed: true
      }
      case GOODBYE_WORLD:
      return {
        hello: 'goodbye',
        completed: true
      }
    default:
      return state;
  }
}

module.exports = howdy;
