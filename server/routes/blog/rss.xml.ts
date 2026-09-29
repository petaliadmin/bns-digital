// Flux RSS des articles en français (prérendu à la génération)
export default defineEventHandler(async (event) => {
  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return await blogRss('fr')
})
