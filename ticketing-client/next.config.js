// 解决nextjs对文件改变无响应的问题
module.exports = {
  webpackDevMiddidleware: config => {
    config.watchOptions.poll = 300;
    return config
  }
}