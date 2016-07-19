const test = require('tape')

const inuLog = require('../')

test('inu-log', function (t) {
  t.ok(inuLog, 'module is require-able')
  t.end()
})
