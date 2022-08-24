/**
 * 数组响应式
 */
const arrayProto = Array.prototype
const arrayMethods = Object.create(arrayProto) // Object.create方法用于创建新对象，使用现有的对象作为新创建对象的原型
const methodsToPatch = [
  'push',
  'pop',
  'unshift',
  'shift',
  'splice',
  'sort',
  'reverse'
] // 这七个数组方法会改变数组本身，所以拿这七个方法做数组响应式
methodsToPatch.forEach((method) => {
  // 给数组的原型对象上添加methodsToPatch的7个增强属性
  Object.defineProperty(arrayMethods, method, {
    // 这7个属性的值是一个函数，并返回值
    // 这个函数接收x个参数
    // 这种表达方式为剩余参数语法，允许将一个不定数量的参数在函数内表达为一个数组。看起来是跟展开语法相反的，把一堆参数从函数头上凝聚成一个数组。
    value: function (...args) {
      const ret = arrayProto[method].apply(this, args) // 调用对应加强属性的数组方法，用apply指向当前被修改的数组，将传入的数据args修改到当前的数组
      const ob = this.__ob__ // Observer.js 里单独为当前arr 挂了一个dep实例 value.__ob__.dep = new Dep()
      console.log('array reactive')
      let inserted = []
      // 获取新增的元素
      switch (method) {
        case 'push':
        case 'unshift':
          inserted = args
          break
        case 'splice':
          // this.arr.splice(idx,deleteNum,addArgs)
          inserted = args.slice(2)
          break
      }
      // 对新增的元素进行响应式处理
      if (inserted) ob.observeArray(inserted)
      // 依赖通知更新
      ob.dep.notify()
      return ret // 并返回值给
    },
    configurable: true,
    writable: true,
    enumerable: false
  })
})

export default function protoArgument(arr) {
  arr.__proto__ = arrayMethods
}
