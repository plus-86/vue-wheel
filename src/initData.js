import observe from './observe.js'
import proxy from './proxy.js'

// 接收Vue实例
export default function initData(vm) {
  // 解构赋值，从Vue实例上取出data
  const { data } = vm.$options
  let _data = (vm._data = {})
  // 如果option里声明了data
  if (data) {
    // 看data是否以
    // data(){
    //   return {}
    // }
    // 方式声明
    _data = vm._data = typeof data === 'function' ? data() : data
  }
  // 数据代理,挂载到vue实例上,实现通过this.xx访问数据
  for (let key in _data) {
    proxy(vm, '_data', key)
  }
  // 实现响应式
  observe(vm._data)
}
