const title = process.env.PAGE_TITLE
export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`
  }
  return `${title}`
}
