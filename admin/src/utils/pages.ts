export const defaultPageParams = {
  pageSize: 20,
  current: 1,
}
export const pagination = {
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  current: 1,
  ...defaultPageParams,
}
