module.exports = {
  transpileDependencies: true,
  //配置webpack
  configureWebpack: {
    resolve: {
      alias: {
        //vue默认有一个别名@: 'src'
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
