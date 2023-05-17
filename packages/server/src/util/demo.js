const toTree = arr => {
  const loop = (pid = '') => {
    return arr.reduce(
      (acc, cur) => (cur.pid === pid ? ((cur.children = loop(cur.id)), acc.push(cur)) : '', acc),
      [],
    )
  }
  return loop()
}

const listToTree = (list, key) => {
  const tree = list.filter(function (parent) {
    // 返回每一项得的子级数据
    const branchArr = list.filter(child => parent.id === child[key])
    parent.children = []
    // 如果存在子级，则给父级添加一个children属性并赋值
    if (branchArr.length > 0) {
      parent.children = branchArr
    }
    // 返回第一层
    return parent[key] == 0
  })
  return tree
}
// 传入原始数据和父级pid的key

const data = [
  { id: '01', name: '张大大', pid: 0, job: '项目经理' },
  { id: '02', name: '小亮', pid: '01', job: '产品leader' },
  { id: '03', name: '小美', pid: '01', job: 'UIleader' },
  { id: '04', name: '老马', pid: '01', job: '技术leader' },
  { id: '05', name: '老王', pid: '01', job: '测试leader' },
  { id: '06', name: '老李', pid: '01', job: '运维leader' },
  { id: '07', name: '小丽', pid: '02', job: '产品经理' },
  { id: '08', name: '大光', pid: '02', job: '产品经理' },
  { id: '09', name: '小高', pid: '03', job: 'UI设计师' },
  { id: '10', name: '小刘', pid: '04', job: '前端工程师' },
  { id: '11', name: '小华', pid: '04', job: '后端工程师' },
  { id: '12', name: '小李', pid: '04', job: '后端工程师' },
  { id: '13', name: '小赵', pid: '05', job: '测试工程师' },
  { id: '14', name: '小强', pid: '05', job: '测试工程师' },
  { id: '15', name: '小涛', pid: '06', job: '运维工程师' },
]

console.log(listToTree(data, 'pid'))
