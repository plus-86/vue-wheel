// target: Vue实例 sourceKey:被代理对象 key:被代理对象的属性
export default function proxy(target, sourceKey, key) {
  Object.defineProperty(target, key, {
    get() {
      // 当以this.xx读取代理数据时，返回被代理数据的值
      return target[sourceKey][key]
    },
    set(newV) {
      // 当以this.xx赋值代理数据时，将值赋给被代理数据
      target[sourceKey][key] = newV
    }
  })
}
