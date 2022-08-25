import compileNode from './compileNode.js'

export default function mount(vm) {
  // DOM的id
  let { el } = vm.$options
  // 获取dom
  el = document.querySelector(el)
  console.log(Array.from(el.childNodes))
  debugger
  // 将dom的子节点(类数组)转化为数组
  compileNode(Array.from(el.childNodes), vm) // Array.from 方法对一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
}
