import defaultConfig from './webpack.config.default';
import webpack from 'webpack';

export default function config(speedupLocalDevelopment, optimize = false) {
    const config = defaultConfig(speedupLocalDevelopment, optimize);

    config.entry = './src/js/app.js';
    config.output = {
        filename: './dist/js/bundle.js'
    };

    return config;
};