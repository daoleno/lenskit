'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./lenskit.prod.cjs')
} else {
  module.exports = require('./lenskit.dev.cjs')
}