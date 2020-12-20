const ShowType = {},
  components = ['Carousel', 'DetailImgs', 'DetailInfo', 'InfoList', 'DetailDesc']
for (const val of components) {
  ShowType[val] = () => import('./' + val + '.vue')
}
const isComponents = (showType) => {
  let str = ''
  switch (showType) {
    case 0:
    case 5:
      str = 'Carousel'
      break
    case 1:
    case 7:
    case 8:
      str = 'DetailImgs'
      break
    case 2:
      str = 'DetailInfo'
      break
    case 3:
      str = 'InfoList'
      break
    case 4:
      str = 'DetailDesc'
      break
  }
  return str
}
export {
  ShowType,
  isComponents
}
