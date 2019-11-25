// Straight from the Gatsby docs (https://www.gatsbyjs.org/docs/unit-testing/)
const babelOptions = {
  presets: ["babel-preset-gatsby"],
}

module.exports = require("babel-jest").createTransformer(babelOptions)
