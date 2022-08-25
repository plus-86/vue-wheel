import Watcher from '../watcher.js'
export default function compileTextNode(node, vm) {
  const key = RegExp.$1.trim() // 去掉空格
  function cb() {
    const value = vm[key] // 这里做一个缓存就不会触发getter，从而优化性能
    node.textContent =
      typeof value === 'object' ? JSON.stringify(value) : String(value)
  }
  new Watcher(cb)
}
