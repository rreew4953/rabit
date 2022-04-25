// 引用 node 的内置方法require  因为 webpack 运行在 node 上 所以可以使用。
const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less'),
      ],
    },
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }));
    config.devServer.disableHostCheck(true);
  },
  /* # 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。 */
  configureWebpack: {
    externals: {
      qc: 'QC',
    },
  },
};
