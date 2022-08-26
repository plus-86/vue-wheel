import Watcher from '../watcher.js'
export default function compileTextNode(node, vm) {
  // 获取第一个匹配到 /{{(.*)}}/ 的 key 值
  const key = RegExp.$1.trim() // 去掉空格
  function cb() {
    // 拿这个key去vue实例里找到对应的value
    const value = vm[key] // 这里做一个缓存就不会触发getter，从而优化性能
    // 替换掉原来的模板语法 {{ key }}
    node.textContent =
      typeof value === 'object' ? JSON.stringify(value) : String(value) // 做一个转换，以防浏览器主动toStrong而显示出'[object Object]'
  }
  new Watcher(cb)
}
