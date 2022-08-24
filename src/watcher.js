import Dep from './dep'

/**
 *
 * @param {*} cb 负责更新 DOM 节点的方法
 */
export default function Watcher(cb) {
  // 存一下
  this._cb = cb
  // 赋值 Dep.target
  Dep.target = this
  // 进行依赖收集。执行回调函数时，会有一些 this.xx 的读取操作，从而触发 getter 进行依赖收集
  this._cb()
  // 防止重复收集
  Dep.target = null
}

Watcher.prototype.update = function () {
  // 当响应式数据更新时，执行 this._cb函数，更新 DOM
  this._cb()
}
