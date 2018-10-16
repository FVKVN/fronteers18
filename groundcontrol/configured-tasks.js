/* eslint-env node */

import gulp from 'gulp';
import webpack from 'webpack';

import consoleArguments from './console-arguments';

import createEslintTask from './tasks/eslint';
import createStylelintTask from './tasks/stylelint';
import createCleanTask from './tasks/clean';
import createCopyTask from './tasks/copy';
import {createCssLocalTask, createCssOptimizedTask} from './tasks/css';
import createBundleTask from './tasks/bundle';
import createServerTask from './tasks/server';
import webpackConfigApp from './config/webpack.config.app';

export const eslint = createEslintTask({
    src: './src/js/**/*.js',
    failAfterError: !consoleArguments.continueAfterTestError
});

export const stylelint = createStylelintTask({src: './src/scss/**/*.scss'});

export const clean = createCleanTask({target: ['./dist']});

export const copy = gulp.parallel(
    createCopyTask({src: ['./src/img/**'], dest: './dist/img'}),
    createCopyTask({src: ['./src/fonts/**'], dest: './dist/fonts'}),
    createCopyTask({src: ['./index.html'], dest: './dist/'})
);

export const cssLocal = createCssLocalTask({src: './src/scss/*.scss', dest: './dist/css'});

export const cssOptimized = createCssOptimizedTask({src: './src/scss/*.scss', dest: './dist/css'});

export const bundleLocal = createBundleTask({
    config: webpackConfigApp(consoleArguments.speedupLocalDevelopment)
});

export const bundleOptimized = createBundleTask({
    config: webpackConfigApp(consoleArguments.speedupLocalDevelopment, true),
    logStats: true
});

export const server = createServerTask({
    config: {
        ui: false,
        ghostMode: false,
        files: [
            'dist/css/*.css',
            'dist/js/*.js',
            'dist/img/**/*',
            'dist/index.html'
        ],
        server: {
            baseDir: './dist'
        },
        open: true,
        reloadOnRestart: true,
        notify: true
    }
});

export function buildOnChange(done) {
    gulp.watch('./src/js/**/!(*.spec).js', bundleLocal);
    gulp.watch('./src/scss/**/*.scss', cssLocal);
    gulp.watch('./index.html', copy);
    done();
}

export function testOnChange(done) {
    gulp.watch('./src/js/**/*.js', eslint);
    gulp.watch('./src/scss/**/*.scss', stylelint);
    gulp.watch('./src/scss/**/*.scss', cssLocal);
    done();
}
