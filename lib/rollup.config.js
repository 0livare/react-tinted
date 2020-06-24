import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

export default {
  input: 'index.js',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    exports: 'named',
  },
  external: ['react'],
  plugins: [resolve(), babel({ babelHelpers: 'runtime' })],
}
