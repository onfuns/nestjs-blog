import LTT from 'list-to-tree'

export const treeFindParent = (tree, fn, result = []) => {
  if (!tree) return []
  for (const data of tree) {
    result.push(data)
    if (fn(data)) return result
    if (data.children) {
      const findChildren = treeFindParent(data.children, fn, result)
      if (findChildren.length) return findChildren
    }
    result.pop()
  }
  return []
}

export const toTree = (data, options = {}) => {
  const ltt = new LTT(data, {
    key_id: 'id',
    key_parent: 'pid',
    key_child: 'children',
    ...options,
  })
  return ltt.GetTree() || []
}
