export default function Dep() {
  // Dep 要通知 watcher 去更新，所以要在 Dep 内保存一些watchers
  this.watchers = []
}
// 实例化 Watcher 时会赋值 Dep.target = Watcher 实例
Dep.target = null

// 依赖收集方法depend, 由它负责依赖收集
Dep.prototype.depend = function () {
  this.watchers.push(Dep.target)
}

// 依赖通知
Dep.prototype.notify = function () {
  for (let watcher of this.watchers) {
    watcher.update()
  }
}
