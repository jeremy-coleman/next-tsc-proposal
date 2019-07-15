
const createTildifyConfig = dir => ({
  "whatever": `./${dir}/whatever`,
  "common": `./${dir}/common`,
  "vendors": `./${dir}/vendors`,
})
const TILDIFY_CONFIG = createTildifyConfig('app')

module.exports = {
  presets: [
    ["next/babel",{"class-properties": { "loose": true } }]
  ],
  plugins: [
    ["module-resolver", {
      root: ["."],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.mjs', '.json'],
      alias: TILDIFY_CONFIG
    }],
  ]
}