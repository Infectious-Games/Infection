const { HEY_WORLD, GOODBYE_WORLD } = require('./actions_test');
const initialState = require('./initialState_test')

const hello = (state = initialState, action) => {
  switch (action.type) {
    case HEY_WORLD:
      return Object.assign({}, state, {
        hello:'world'
      })
      case GOODBYE_WORLD:
      return Object.assign({}, state, {
        hello: 'goodbye'
      })
    default:
      return state;
  }
}

module.exports = hello;
