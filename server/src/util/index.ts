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

export const IS_DEV = process.env.NODE_ENV !== 'production'

export const isObject = data => Object.is(Object.prototype.toString.call(data), '[object Object]')
