// Transpile all code following this line with babel and use '@babel/preset-env' (aka ES6) preset.
require("@babel/register")({
  presets: ["@babel/preset-env"],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
});
require('module-alias/register')
module.exports = require('./app.js')
