import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypescript from 'react-refresh-typescript';
import {BuildOptions} from './types/types';

export function buildLoaders({mode}: BuildOptions): ModuleOptions['rules'] {

    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgrLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const cssLoadersWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        }
    }

    const sccsLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            // Translates CSS into CommonJS
            cssLoadersWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypescript()].filter(Boolean)
                    })
                }
            }
        ]
    }

    const babelLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: [
                    '@babel/preset-env',
                    "@babel/preset-typescript",
                    ["@babel/preset-react", {
                        runtime: isDev? 'automatic' : 'classic'
                    }]
                ]
            }
        }
    }

    return [
        assetLoader,
        sccsLoader,
        // tsLoader,
        babelLoader,
        svgrLoader
    ]
}