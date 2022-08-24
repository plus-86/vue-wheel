// Object.defineProperty 递归调用 Object.create  剩余参数语法

import observe from './observe.js'

// target: 目标对象，key：目标对象属性名，val：目标对象属性值
export default function defineReactive(target, key, val) {
  // 递归调用(自己调自己)
  observe(val)
  // 给目标对象的属性做如下定义
  Object.defineProperty(target, key, {
    // 当目标对象的属性被读取
    get() {
      console.log('getter key =', key)
      return val // 当被读取时，返回赋予的值
    },
    // 当目标对象的属性被改变
    set(newV) {
      console.log(`setter ${key} : ${val}`)
      // 当值被改变时，先对比新值和旧值
      if (newV === val) return // 相等则什么也不做
      val = newV // 不相等更新旧值
      observe(val) // 对新值(根属性的属性，更新为新值)做响应式处理
    }
  })
}

// // 给根级属性添加新值
// function set(target, key, value) {
//   defineReactive(target, key, value)
// }
