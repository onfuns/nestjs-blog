import LTT from 'list-to-tree'
export { default as api } from './api'
export { default as cache } from './cache'

export const toTree = (data, options = {}) => {
  const ltt = new LTT(data, {
    key_id: 'id',
    key_parent: 'pid',
    key_child: 'children',
    ...options,
  })
  return ltt.GetTree() || []
}
