import Observer from './Observer.js'

// 仅仅调用 Observe ，层级更深的对象属性无法变为响应式
export default function observe(value) {
  // 当值不为对象时停止调用
  if (typeof value !== 'object') return
  const ob = new Observer(value)
  return ob
}
