import alias from 'rollup-plugin-alias'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import butternut from 'rollup-plugin-butternut'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

const plugins = [
    alias({
        vue$: 'vue/dist/vue.common.js'
    }),
    vue({
        css: './dist/css/main.css',
        scss: {
            file: './src/style.scss',
            includePaths: [
                './node_modules'
            ]
        }
    }),
    buble({
        objectAssign: 'Object.assign'
    }),
    resolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs(),
    globals()
];

const config = {
    input: './src/main.js',
    output: {
        file: './dist/js/main.min.js',
        format: 'es'
    },
    sourcemap: 'inline',
    plugins,
};

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV === 'development';

if (isProduction) {
    config.sourcemap = false;
    config.plugins.push(butternut())
}

if (isDevelopment) {
    config.plugins.push(livereload());
    config.plugins.push(serve({
        contentBase: './dist/',
        port: 8080,
        open: false
    }))
}

export default config