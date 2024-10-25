import { FEEDS } from './config/feeds';
import { FeedItem, fetchRSSFeed } from './services/rss.service';
import { generateRSSFeed } from './services/xml.service';
import logger from './utils/logger';

export const handler = async (event: any, context: any): Promise<{ statusCode: number, headers: { [key: string]: string }, body: string }> => {
  try {
    const allItems: FeedItem[] = [];

    for (const feedUrl of FEEDS) {
      const items = await fetchRSSFeed(feedUrl);
      allItems.push(...items);
    }

    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const xml = generateRSSFeed(allItems);

    logger.info('Generated new RSS feed');
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/rss+xml' },
      body: xml
    };
  } catch (error) {
    const err = error as Error;
    logger.error(`Error generating feed: ${err.message}`);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to generate RSS feed' })
    };
  }
}
