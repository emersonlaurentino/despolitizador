const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
const merge = require("webpack-merge");
const OfflinePlugin = require("offline-plugin");
const path = require('path');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const config = require("./webpack.config");
const appConfig = require("../app.config.json");

module.exports = merge.smart(config, {
  mode: "production",
  devtool: "cheap-hidden-source-map",
  plugins: [
    new BundleAnalyzerPlugin({ analyzerMode: "disabled" }),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
    new LodashModuleReplacementPlugin({
      paths: true,
      shorthands: true,
      cloning: true,
      currying: true,
      caching: true,
      collections: true,
      exotics: true,
      guards: true,
      metadata: true,
      deburring: true,
      unicode: true,
      chaining: true,
      memoizing: true,
      coercions: true,
      flattening: true,
      placeholders: true
    }),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      caches: {
        main: ["index.html"],
        additional: ["*.js?*", "medias/*.svg"]
      },
      navigateFallbackURL: "/",
      autoUpdate: true,
      responseStrategy: "network-first",
      ServiceWorker: { events: true },
      AppCache: { events: true }
    }),
    new WebpackPwaManifest({
      name: appConfig.title,
      short_name: appConfig.short_name,
      description: appConfig.description,
      background_color: appConfig.theme_color,
      theme_color: appConfig.theme_color,
      icons: [
        {
          src: path.resolve("../src/medias/political-avatar.png"),
          sizes: [96, 128, 192, 256, 384, 512]
        }
      ]
    })
  ]
});
