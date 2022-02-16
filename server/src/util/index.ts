import * as LTT from 'list-to-tree'

export const toTree = (data, options = {}) => {
  const ltt = new LTT(data, {
    key_id: 'id',
    key_parent: 'pid',
    key_child: 'children',
    ...options,
  })
  return ltt.GetTree() || []
}
