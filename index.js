const extend = require('xtend')
const pull = require('pull-stream/pull')
const through = require('pull-stream/throughs/through')

module.exports = inuLog

function inuLog (app) {
  return extend(app, {
    init: function () {
      const init = app.init()
      console.log('init:', init)
      return init
    },
    update: function (model, action) {
      const state = app.update(model, action)
      logAction(model, action, state)
      return state
    },
    run: function (effect, sources) {
      const nextActions = app.run(effect, sources)
      return logEffect(effect, nextActions)
    }
  })
}

function logAction (model, action, state) {
  console.groupCollapsed('action:', action)
  console.log('new state:', state)
  if (model !== state.model) {
    console.log('model: from', model, 'to', state.model)
  } else {
    console.log('model (not changed):', model)
  }
  console.log('effect:', state.effect)
  console.groupEnd()
}

function logEffect (effect, nextActions) {
  if (nextActions) {
    // group produced actions
    console.log('effect:', effect)

    return pull(
      nextActions,
      through(
        // TODO pick a color and paint logs in color
        (action) => console.log('action:', action),
        (err) => {
          if (err) console.error('error:', err)
        }
      )
    )
  } else {
    console.log('effect:', effect)
  }
}
