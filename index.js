const extend = require('xtend')
const pull = require('pull-stream/pull')
const through = require('pull-stream/throughs/through')

module.exports = {
  gives: { inu: { enhancer: true } },
  create: () => ({ inu: { enhancer } } )
}

// TODO re-factor using catstack-log
// and child logs for every "group" of log messages

function enhancer (app) {
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
    run: function (model, effect, sources) {
      const nextActions = app.run(model, effect, sources)
      return logEffect(model, effect, nextActions)
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

function logEffect (model, effect, nextActions) {
  if (nextActions) {
    // group produced actions
    console.log('effect:', effect)
    console.log('current model:', effect)

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
