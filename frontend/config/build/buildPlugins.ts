import MiniCssExtractPlugin, { Configuration } from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import path from 'path';

export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({template: paths.html, favicon: path.resolve(paths.public, 'favicon.png')}),
        new webpack.DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
        }),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ForkTsCheckerWebpackPlugin()),
        plugins.push(new ReactRefreshPlugin())
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }))
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }
    return plugins;
}