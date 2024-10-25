import builder from 'xmlbuilder';
import { FeedItem } from './rss.service';

function sanitizeText(text: string): string {
  return Buffer.from(text, 'utf8').toString();
}

export function generateRSSFeed(items: FeedItem[]) {
  const rssFeed = builder.create('rss', { encoding: 'utf-8' })
    .att('version', '2.0')
    .ele('channel')
    .ele('title', 'Title').up()
    .ele('description', 'Description').up();

  items.forEach(item => {
    rssFeed.ele('item')
      .ele('title', sanitizeText(item.title)).up()
      .ele('link', item.link).up()
      .ele('pubDate', item.pubDate).up()
      .ele('description', sanitizeText(item.contentSnippet || item.content || '')).up();
  });

  return rssFeed.end({ pretty: true });
}