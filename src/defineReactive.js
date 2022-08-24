// target: 目标对象，key：目标对象属性名，val：目标对象属性值
function defineReactive(target, key, val) {
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
// 遍历对象内所有属性，将其变为响应式
function Observer(value) {
  if (Array.isArray(value)) {
    // 数组响应式
    value.__proto__ = arrayMethods // 更改要做数组响应式的数组的原型对象
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
// 仅仅调用 Observe ，层级更深的对象属性无法变为响应式
function observe(value) {
  // 当值不为对象时停止调用
  if (typeof value !== 'object') return
  const ob = new Observer(value)
  return obj
}
// 给根级属性添加新值
function set(target, key, value) {
  defineReactive(target, key, value)
}

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
      console.log('array reactive')
      return ret // 并返回值给
    },
    configurable: true,
    writable: true,
    enumerable: false
  })
})

const obj = {
  t: 't value',
  t1: {
    tt1: 'tt1 value'
  },
  arr: [1, 2, 3]
}

observe(obj)
