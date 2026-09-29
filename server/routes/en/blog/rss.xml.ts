// RSS feed of English articles (prerendered at build time)
export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return await blogRss('en')
})
