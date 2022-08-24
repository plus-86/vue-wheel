import defineReactive from './defineReactive.js'
import protoArgument from './protoArgument.js'
// 遍历对象内所有属性，将其变为响应式
export default function Observer(value) {
  if (Array.isArray(value)) {
    // 数组响应式
    protoArgument(value) // 更改要做数组响应式的数组的原型对象
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
