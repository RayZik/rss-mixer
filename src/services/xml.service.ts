import builder from 'xmlbuilder';
import { FeedItem } from './rss.service';

function sanitizeText(text: string): string {
  const newText = Buffer.from(text, 'utf8').toString();
  return newText;
}

function removeQueryParams(url: string): string {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.search = '';
    return parsedUrl.toString();
  } catch (error) {
    return url;
  }
}

export function generateRSSFeed(items: FeedItem[], title = 'Combined RSS Feed', description = 'Aggregated RSS'): string {
  const rssFeed = builder.create('rss', { encoding: 'utf-8' })
    .att('version', '2.0')
    .ele('channel')
    .ele('title', sanitizeText(title)).up()
    .ele('description', sanitizeText(description)).up();

  items.forEach(item => {
    const itemElement = rssFeed.ele('item')
      .ele('title', sanitizeText(item.title)).up()
      .ele('link', removeQueryParams(item.link)).up()
      .ele('pubDate', item.pubDate).up()
      .ele('description', sanitizeText(item.contentSnippet || item.content || '')).up()
      .ele('language', sanitizeText(item.language || '')).up() // @TODO ask gpt to guess lang
      .ele('comments', sanitizeText(item.comments || '')).up();

    (item.categories || []).forEach(category => {
      itemElement.ele('category', sanitizeText(category)).up();
    });
  });

  return rssFeed.end({ pretty: true });
}