import cheerio from 'cheerio'

export const parseHtml = html => {
  const $ = cheerio.load(html)
  let list = []
  $('h1,h2,h3,h4,h5').each(function (index: any, ele) {
    const text = $(this).text()
    list.push({ title: text, tagName: ele.name, index })
  })
  return { anchor: list, html: $.html() }
}

export const isInViewport = el => {
  const { top, height, bottom } = el.getBoundingClientRect()
  const clientHeight = document.documentElement.clientHeight
  if ((top > 0 && bottom - height < clientHeight) || (top < 0 && bottom > 0)) {
    return true
  } else {
    return false
  }
}
