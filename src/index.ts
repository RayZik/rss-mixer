import { getFeed } from './config/feeds';
import { fetchRSSFeed } from './services/rss.service';
import { generateRSSFeed } from './services/xml.service';
import logger from './utils/logger';

export const handler = async (event: any, context: any): Promise<{ statusCode: number, headers: { [key: string]: string }, body: string }> => {
  try {
    const feedUrl = getFeed();

    const feed = await fetchRSSFeed(feedUrl);

    const xml = generateRSSFeed(feedUrl, feed.items);

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
