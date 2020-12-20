export default function (variable) {
  const query = window.location.search.substring(1)
  const vars = query.split('&')
  // console.log(window.location, window.location.search, query, vars)
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === variable) {
      return pair[1]
    }
  }
  return false
}
