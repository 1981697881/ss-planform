export default file => {
  return map[file] || null
}

const map = {
  Layout: () => import('@/layout'),
  error: () => import('@/views/404'),
  '/basic': () => import('@/layout'),
  'warehouse': () => import('@/views/basic/warehouse'),

  'barcodeImport': () => import('@/views/information/barcodeImport'),
  'barcodePrinting': () => import('@/views/information/barcodePrinting'),

  'users': () => import('@/views/system/users'),
  'setOfBooks': () => import('@/views/system/setOfBooks'),
  'parameter': () => import('@/views/system/parameter')

}
