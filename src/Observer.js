import defineReactive from './defineReactive.js'
import Dep from './dep.js'
import observe from './observe.js'
import protoArgument from './protoArgument.js'
// 遍历对象内所有属性，将其变为响应式
export default function Observer(value) {
  Object.defineProperty(value, '__ob__', {
    value: this,
    // 防止递归时，处理__ob__从而进行无线递归
    // 在页面显示时，不显示 __ob__ 属性
    enumerable: false,
    writable: true,
    configurable: true
  })
  value.__ob__.dep = new Dep()
  if (Array.isArray(value)) {
    // 数组响应式
    protoArgument(value) // 更改要做数组响应式的数组的原型对象
    this.observeArray(value)
  } else {
    // 对象响应式
    this.walk(value)
  }
}

// 对象响应式方法walk
Observer.prototype.walk = function (obj) {
  for (let key in obj) {
    defineReactive(obj, key, obj[key])
  }
}

// 处理数组中元素为非原始值的情况，让这些元素也具有响应式的能力
// 例子:
// arr = [1,2,{a: 'a value'}]
// this.arr[2].a = 'new value'
Observer.prototype.observeArray = function (arr) {
  for (let item of arr) {
    observe(item)
  }
}
