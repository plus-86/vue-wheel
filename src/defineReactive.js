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
      observe(val) // 对新值做响应式处理
    }
  })
}
// 遍历对象内所有属性，将其变为响应式
function Observer(value) {
  if (Array.isArray(value)) {
    // 数组响应式
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
  console.log(typeof value)
  if (typeof value !== 'object') return
  const ob = new Observer(value)
  return obj
}
// 给根级属性添加新值
function set(target, key, value) {
  defineReactive(target, key, value)
}

const obj = {
  t: 't value',
  t1: {
    tt1: 'tt1 value'
  },
  arr: [1, 2, 3]
}

observe(obj)
