import initData from './initData.js'
// 定义一个Vue实例
export default function Vue(options) {
  this._init(options)
}

Vue.prototype._init = function (options) {
  this.$options = options // options做一个备份
  // 这个this是Vue实例
  initData(this)
}
