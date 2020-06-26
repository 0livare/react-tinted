import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'es', // Output bundle should use ES Module syntax
    sourcemap: true,
    exports: 'named', // Export multiple named modules instead of a single default one
  },
  // Do not include these 3rd party libraries in the bundled code
  external: ['react', '@babel/runtime', 'tinted', 'prop-types'],
  plugins: [
    // Teach Rollup how to resolve files like Node does
    // See: https://rollupjs.org/guide/en/#rollupplugin-node-resolve
    resolve(),
    // Some libraries expose ES modules that you can import as-is. But
    // at the moment, the majority of packages on NPM are exposed as
    // CommonJS modules instead. Until that changes, we need to convert
    // CommonJS to ES2015 before Rollup can process them.
    // Note: This should go before other plugins that transform modules
    // to prevent the other plugins from making changes that break the
    // CommonJS detection.
    // See: https://rollupjs.org/guide/en/#rollupplugin-commonjs
    commonjs({include: /node_modules/}),
    babel({
      // Do not include the babel helper functions in the bundled code code,
      // instead, expect the user of this library to provide it
      // See: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
      // See: https://babeljs.io/docs/en/babel-plugin-transform-runtime#why
      // This is not currently working as expected: https://github.com/rollup/plugins/issues/475
      babelHelpers: 'runtime',
      // See: https://github.com/rollup/rollup-plugin-commonjs/issues/361#issuecomment-462945953
      exclude: /node_modules/,
    }),
  ],
}
