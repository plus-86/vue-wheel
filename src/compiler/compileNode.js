import compileTextNode from './compileTextNode.js'

export default function compileNode(nodes, vm) {
  // 遍历获取到的el下的所有子节点
  for (let node of nodes) {
    // 每个子节点都有一个nodeType，用来表示该节点的类型
    if (node.nodeType === 1) {
      // 当nodeType为1表示元素节点，如<p>、<div>
      // 递归，编译节点上的各个属性，比如v-bind、v-model、v-on:click
      compileNode(Array.from(node.childNodes), vm)
    } else if (node.nodeType === 3 && node.textContent.match(/{{(.*)}}/)) {
      // 当nodeType为3表示文本节点，node.textContent 将文本内容拿来做 模板语法的匹配
      // 当前为文本节点，比如  <span>{{ key }}</span>
      compileTextNode(node, vm) // 编译模板语法
    }
  }
}
