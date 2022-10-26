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
      },
    }
  },
  // devServer: {
  //   host: '10.120.1.249',
  //   // https:true,
  //   port: 8080,
  //   client: {
  //     webSocketURL: 'ws://10.120.1.249:8080/ws',
  //   },
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   }
  // },
}
