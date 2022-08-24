import Observer from './Observer.js'

// 仅仅调用 Observe ，层级更深的对象属性无法变为响应式
export default function observe(value) {
  // 当值不为对象时停止调用
  if (typeof value !== 'object') return
  // 说明value已经是响应式对象，不需再做响应式处理
  if (value.__ob__) return value.__ob__
  const ob = new Observer(value)
  return ob
}
